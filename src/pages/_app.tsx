import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'mobx-react';
import { getStores } from '@/stores/stores';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider {...getStores()}>
      <Component {...pageProps} />
    </Provider>
  );
}
