import type { AppProps } from 'next/app';
import GlobalStyle from '@/styles/GlobalStyle';
import '@/styles/tools.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
