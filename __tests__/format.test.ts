import { formatPrice } from '@/utils/format';

describe('formatPrice', () => {
  it('formats numbers to currency', () => {
    expect(formatPrice(1234.5)).toMatch(/1.?234/);
  });
});
