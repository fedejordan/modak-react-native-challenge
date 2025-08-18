import { FlatList, TouchableOpacity, Text } from 'react-native';

function CategoriesView({
  categories,
  setCategory,
  fetchProducts,
}: {
  categories: string[];
  setCategory: (cat: string | null) => void;
  fetchProducts: () => void;
}) {
  return (
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
  );
}

export default CategoriesView;
