import { View, TouchableOpacity, Text } from 'react-native';

import { SortBy } from '@/domain/types/sort';

function SortView({
  setSort,
  fetchProducts,
}: {
  setSort: (sort: SortBy) => void;
  fetchProducts: () => void;
}) {
  return (
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
  );
}

export default SortView;
