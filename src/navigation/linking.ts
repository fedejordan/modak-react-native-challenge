import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'modak-rn-challenge://'],
  config: {
    screens: {
      Home: 'category/:name?',
      ProductDetail: 'product/:id',
    },
  },
};

export default linking;
