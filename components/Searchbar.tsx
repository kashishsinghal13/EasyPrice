"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react'

const isValidAmazonProductUrl = (url: string): boolean => {
  try {
    const { hostname } = new URL(url);

    return (
      hostname.includes('amazon.com') ||
      hostname.endsWith('.amazon') ||
      hostname.includes('.amazon.')
    );
  } catch {
    return false;
  }
};

const Searchbar = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidUrl = isValidAmazonProductUrl(inputValue);
    if (!isValidUrl) {
      alert('Please provide a valid Amazon link');
      return;
    }

    try {
      setIsLoading(true);
      const productId = await scrapeAndStoreProduct(inputValue);
      router.push(`/products/${productId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form
      className="flex flex-wrap gap-4 mt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter product link"
        className="searchbar-input"
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={inputValue.trim() === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default Searchbar