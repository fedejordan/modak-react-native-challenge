import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  useProductsStore,
  sortProducts,
  useCategories,
  useLoading,
  useError,
} from '@/stores/products.store';
import ProductCard from '@/components/ProductCard';
import SortView from '@/components/SortView';
import CategoriesView from '@/components/CategoriesView';
import LoadingView from '@/components/LoadingView';
import ErrorView from '@/components/ErrorView';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
type HomeRoute = RouteProp<RootStackParamList, 'Home'>;

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<HomeRoute>();
  const category = params?.category;

  const products = useProductsStore((state) => state.products);
  const sortBy = useProductsStore((state) => state.sortBy);
  const categories = useCategories();
  const loading = useLoading();
  const error = useError();
  const visibleProducts = useMemo(() => sortProducts(products, sortBy), [products, sortBy]);

  const fetchCategories = useProductsStore((action) => action.fetchCategories);
  const fetchProducts = useProductsStore((action) => action.fetchProducts);
  const setCategory = useProductsStore((action) => action.setCategory);
  const setSort = useProductsStore((action) => action.setSort);
  const clearError = useProductsStore((action) => action.clearError);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (category && categories.includes(category)) {
      setCategory(category);
      fetchProducts();
    }
  }, [category, categories]);

  useEffect(() => {
    fetchCategories();
    if (!category) fetchProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCategories();
    await fetchProducts();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading ? (
        <LoadingView />
      ) : error ? (
        <ErrorView message={error} onRetry={clearError} />
      ) : (
        <>
          <CategoriesView
            categories={categories}
            setCategory={setCategory}
            fetchProducts={fetchProducts}
          />

          <SortView setSort={setSort} fetchProducts={fetchProducts} />

          <FlatList
            data={visibleProducts}
            keyExtractor={(p) => String(p.id)}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
              />
            )}
            style={{ flex: 1 }}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </>
      )}
    </View>
  );
}
