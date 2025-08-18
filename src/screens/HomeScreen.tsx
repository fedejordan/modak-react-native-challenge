import { View, Text, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, gap: 12, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <Button
        title="Go to product 1"
        onPress={() => navigation.navigate('ProductDetail', { id: 1 })}
      />
      <Button
        title="See 'smartphones'"
        onPress={() => navigation.navigate('Category', { slug: 'smartphones' })}
      />
    </View>
  );
}
