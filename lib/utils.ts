import { PriceHistoryItem, Product } from "@/types";

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

export function extractPrice(...priceElements: any[]): string {
  for (const element of priceElements) {
    const priceText = element.text().trim();

    if (!priceText) {
      continue;
    }

    const cleanPrice = priceText.replace(/[^\d.]/g, '');
    const match = cleanPrice.match(/\d+\.\d{2}/);
    return match ? match[0] : cleanPrice;
  }

  return '';
}

export function extractCurrency(element: any): string {
  const currencyText = element.text().trim().charAt(0);
  return currencyText || "";
}

export function extractDescription($: any): string {
  const selectorOptions = [
    ".a-unordered-list .a-list-item",
    ".a-expander-content p",
  ];

  for (const selector of selectorOptions) {
    const elements = $(selector);
    if (elements.length > 0) {
      const description = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      
      return description;
    }
  }

  return "";
}

export function getHighestPrice(priceHistory: PriceHistoryItem[]) {
  let highestPriceItem = priceHistory[0];

  for (const priceItem of priceHistory) {
    if (priceItem.price > highestPriceItem.price) {
      highestPriceItem = priceItem;
    }
  }

  return highestPriceItem.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(prices: PriceHistoryItem[]) {
  const totalPrice = prices.reduce((sum, { price }) => sum + price, 0);
  const averagePrice = totalPrice / prices.length || 0;

  return averagePrice;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }

  return null;
};

export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};