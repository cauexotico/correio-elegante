import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Script
        id="adsense-id"
        async
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6296770603213727"
      />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
