import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {Home} from './src/screen/home';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#009008',
  },
};

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <Home />
      </PaperProvider>
    </QueryClientProvider>
  );
}
