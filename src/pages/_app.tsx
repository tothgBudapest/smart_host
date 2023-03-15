import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import { getStores } from '@/stores/stores';
import { appWithTranslation } from 'next-i18next';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider {...getStores()}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default appWithTranslation(App);
