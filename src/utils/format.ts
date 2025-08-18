export const formatPrice = (value: number, currency = 'USD', locale = 'en-US') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
