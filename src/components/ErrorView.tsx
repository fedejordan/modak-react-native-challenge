import { View, Text, TouchableOpacity } from 'react-native';

function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'red' }}>{message}</Text>
      <TouchableOpacity onPress={onRetry}>
        <Text style={{ color: 'blue' }}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ErrorView;
