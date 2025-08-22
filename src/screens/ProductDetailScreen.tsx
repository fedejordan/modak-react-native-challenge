import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { useProductsStore } from '@/stores/products.store';
import { formatPrice } from '@/utils/format';
import AddReminderButton from '@/components/AddReminderButton';
import TriggerNotificationButton from '@/components/TriggerNotificationButton';

type ProductDetailRoute = RouteProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen() {
  const { params } = useRoute<ProductDetailRoute>();
  const { id } = params;

  const fetchProductById = useProductsStore((s) => s.fetchProductById);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<{
    id: number;
    title: string;
    price: number;
    rating: number;
    thumbnail: string;
    brand: string;
    description: string;
    stock: number;
    category: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const p = await fetchProductById(id);
        if (mounted) setProduct(p);
      } catch (e: unknown) {
        if (mounted) setError(String((e as Error)?.message ?? e));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id, fetchProductById]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  if (error || !product) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error ?? 'Not linked product'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Image
        source={{ uri: product.thumbnail }}
        resizeMode="cover"
        style={{ width: '100%', height: 260, borderRadius: 12, marginBottom: 16 }}
      />
      <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 8 }}>{product.title}</Text>
      <Text style={{ fontSize: 18, marginBottom: 4 }}>{formatPrice(product.price)}</Text>
      <Text style={{ marginBottom: 4 }}>⭐ {product.rating}</Text>
      {product.brand && <Text style={{ marginBottom: 4 }}>Brand: {product.brand}</Text>}
      <Text style={{ marginBottom: 8, color: '#444' }}>{product.description}</Text>
      <Text style={{ marginBottom: 4 }}>Stock: {product.stock}</Text>
      <Text style={{ marginBottom: 16 }}>Category: {product.category}</Text>
      <AddReminderButton
        title={product.title}
        notes={product.description}
        whenISO={new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString()}
      />
      <TriggerNotificationButton title={product.title} />
    </ScrollView>
  );
}
