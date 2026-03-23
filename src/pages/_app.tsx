import GlobalStyle from '@/styles/GlobalStyle';
import '@/styles/tools.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
