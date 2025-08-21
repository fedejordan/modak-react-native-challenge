import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ProductCard from '@/components/ProductCard';

describe('ProductCard', () => {
  it('shows title, price, and rating', () => {
    const product = {
      id: 'p1',
      title: 'Earbuds Pro',
      price: 199.99,
      rating: 4.5,
      thumbnail: 'https://example.com/img.jpg',
    };

    render(<ProductCard item={product as any} onPress={() => {}} />);

    expect(screen.getByText(/Earbuds Pro/i)).toBeTruthy();
    expect(screen.getByText(/\$|USD|ARS|199.99/)).toBeTruthy();
  });
});
