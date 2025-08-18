import { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import {
  useProductsStore,
  useVisibleProducts,
  useCategories,
  useLoading,
  useError,
} from '@/stores/products.store';

export default function HomeScreen() {
  const products = useVisibleProducts();
  const categories = useCategories();
  const loading = useLoading();
  const error = useError();

  const fetchCategories = useProductsStore((s) => s.fetchCategories);
  const fetchProducts = useProductsStore((s) => s.fetchProducts);
  const setCategory = useProductsStore((s) => s.setCategory);
  const setSort = useProductsStore((s) => s.setSort);
  const clearError = useProductsStore((s) => s.clearError);

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

      {/* Filtros simples */}
      <FlatList
        horizontal
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
        style={{ marginBottom: 12 }}
      />

      {/* Orden */}
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

      {/* Lista */}
      <FlatList
        data={products}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text>{item.title}</Text>
            <Text>
              ${item.price} • ⭐ {item.rating}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
