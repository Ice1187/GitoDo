import HeadInfo from '../components/headInfo';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <HeadInfo />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
