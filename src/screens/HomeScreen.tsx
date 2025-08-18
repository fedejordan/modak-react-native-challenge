import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useEffect, useMemo } from 'react';
import {
  useProductsStore,
  sortProducts,
  useCategories,
  useLoading,
  useError,
} from '@/stores/products.store';

export default function HomeScreen() {
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

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading && <ActivityIndicator />}
      {error && (
        <TouchableOpacity onPress={clearError}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </TouchableOpacity>
      )}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={['all', ...categories]}
        keyExtractor={(c) => c}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setCategory(item === 'all' ? null : item);
              fetchProducts();
            }}
            style={{ padding: 8, marginRight: 8, borderWidth: 1, borderRadius: 8 }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        style={{ height: 40, marginBottom: 16, flexGrow: 0, flexShrink: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
        <TouchableOpacity
          onPress={() => {
            setSort('price');
            fetchProducts();
          }}
          style={{ padding: 8, borderWidth: 1, borderRadius: 8 }}
        >
          <Text>Sort: Price</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSort('rating');
            fetchProducts();
          }}
          style={{ padding: 8, borderWidth: 1, borderRadius: 8 }}
        >
          <Text>Sort: Rating</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={visibleProducts}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: 1,
            }}
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text>{item.title}</Text>
              <Text>
                ${item.price} • ⭐ {item.rating}
              </Text>
            </View>
          </View>
        )}
        style={{ flex: 1 }}
      />
    </View>
  );
}
