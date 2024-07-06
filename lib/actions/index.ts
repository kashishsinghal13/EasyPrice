"use server"

import Product from "../models/product.model";
import { connectToDB } from "../mangoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { User } from "@/types";



export async function scrapeAndStoreProduct(url: string) {
  if (!url) return null;

  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(url);
    if(!scrapedProduct) return null;
    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    if(existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ]

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      }
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    return newProduct?._id.toString();
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

export async function getProductById(productId: string){
  try {
    await connectToDB();
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return null;
    }
    return product;
  } catch (error: any) {
    console.error(`Failed to fetch product with ID ${productId}: ${error.message}`);
    throw error;
  }
}

export async function fetchAllProducts() {
  try {
    await connectToDB();
    return await Product.find();
  } catch (error: any) {
    throw new Error(`Failed to fetch all products: ${error.message}`);
  }
}

export async function getSimilarProducts(productId: string){
  try {
    await connectToDB();
    const currentProduct = await Product.findById(productId);
    if (!currentProduct) {
      return [];
    }
    const similarProducts = await Product.find({
      _id: { $ne: productId },
    })
      .limit(3)
      .exec();
    return similarProducts;
  } catch (error: any) {
    throw new Error(`Failed to fetch similar products: ${error.message}`);
  }
}

export async function addUserEmailToProduct(productId: string, email: string) {
  try {
    const product = await Product.findById(productId);
    if (!product || product.users.some((user: User) => user.email === email)) {
      return null;
    }
    product.users.push({ email });
    await product.save();
   
    const emailContent = await generateEmailBody(product, "WELCOME");
    await sendEmail(emailContent, [email]);
    return "success"
  } catch (error: any) {
    console.error(`Failed to add user email to product: ${error.message}`);
  }
}