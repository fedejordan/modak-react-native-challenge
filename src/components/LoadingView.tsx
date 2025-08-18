import { View, ActivityIndicator, Text } from 'react-native';

function LoadingView() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
      <Text>Loading...</Text>
    </View>
  );
}

export default LoadingView;
