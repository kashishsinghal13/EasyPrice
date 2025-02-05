import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
  product: Product;
}
 
const ProductCard = ({ product }: Props) => {
  const { _id, title, image, category, currency, currentPrice } = product;

  return (
    <Link href={`/products/${_id}`} className="product-card">
      <div className="product-card_img-container">
        <Image src={image} alt={title} width={200} height={200} className="product-card_img" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="product-title">{title}</h3>
        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">{category}</p>
          <p className="text-black text-lg font-semibold">
            <span>{currency}</span>
            <span>{currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard