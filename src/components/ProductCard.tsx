import { View, Image, Text, TouchableOpacity } from 'react-native';

type Props = {
  item: {
    id: number;
    title: string;
    price: number;
    rating: number;
    thumbnail: string;
  };
  onPress?: () => void;
};

function ProductCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
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
    </TouchableOpacity>
  );
}

export default ProductCard;
