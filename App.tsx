import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ProductsHttpRepository } from '@/data/repositories/products-http.repository';
import { CategoriesHttpRepository } from '@/data/repositories/categories-http.repository';

const productsRepository = new ProductsHttpRepository();
const categoriesRepository = new CategoriesHttpRepository();

async function loadHome() {
  const [products, categories] = await Promise.all([
    productsRepository.getAll(),
    categoriesRepository.getCategories(),
  ]);
  return { products, categories };
}

export default function App() {
  useEffect(() => {
    loadHome().then((data) => {
      console.log('Products count:', data.products.length);
      console.log('Categories count:', data.categories.length);
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>OK</Text>
    </View>
  );
}
