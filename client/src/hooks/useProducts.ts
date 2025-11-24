import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  name_ar: string;
  price: number;
  image: string;
  description: string;
  description_ar: string;
  category: string;
  featured?: boolean;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter((p) => p.category === category);
  };

  const getFeaturedProducts = () => {
    return products.filter((p) => p.featured);
  };

  const getCategories = () => {
    return Array.from(new Set(products.map((p) => p.category)));
  };

  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.name_ar.includes(query) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.description_ar.includes(query)
    );
  };

  return {
    products,
    loading,
    error,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getCategories,
    searchProducts,
  };
}
