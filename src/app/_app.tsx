// pages/_app.js or pages/_app.tsx

import Script from 'next/script';
import '../styles/globals.css'; // Import global styles (if any)

function MyApp({ Component, pageProps }:any) {
  return (
    <>
      <Script
        id="pirsch-analytics"
        src="https://api.pirsch.io/pa.js"
        data-code="31jEKw3aG6dreCdq0ZobcTWelRXztm9c"
        strategy="afterInteractive"
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
