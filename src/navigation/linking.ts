import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './types';

// console.log(Linking.createURL('product/123'));

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'modak-rn-challenge://'],
  config: {
    screens: {
      Home: 'category/:name?',
      ProductDetail: {
        path: 'product/:id',
        parse: { id: Number },
        stringify: { id: (v: number) => String(v) },
      },
    },
  },
};

export default linking;
