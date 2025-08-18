import { View, Image, Text } from 'react-native';

function ProductCard({ item }: { item: any }) {
  return (
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
  );
}

export default ProductCard;
