import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import store from '@/store';
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CookiesProvider } from 'react-cookie';
import { Poppins } from 'next/font/google';


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <NextNProgress color={'red'} />
          <Component {...pageProps} />
        </CookiesProvider>
      </Provider>
    </>
  );
}
