import Head from 'next/head'
import Script from 'next/script'

function Layout({ children }) {
    return (
        <>
            <Head>
                <title>LoveBox - Um correio elegante online</title>

                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta name="description" content="Um serviço de correio elegante online para whatsapp" />
                <meta name="keywords" content="correio elegante, online, whatsapp, anonimo, amor, carinho, festa junina, dia dos namorados" />
                <meta name="reply-to" content="khaue.po@hotmail.com" />
                <meta name="robots" content="index,follow" />
                <meta httpEquiv="content-language" content="pt-br" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:title" content="LoveBox - Um correio elegante online" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Um serviço de correio elegante online para whatsapp" />
                <meta property="og:url" content="https://lovebox.khaue.com.br" />
                <meta property="og:image" content="https://lovebox.khaue.com.br" />
                <meta property="og:site_name" content="Correio Elegante Online" />
                <meta property="og:locale" content="pt_BR" />

                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Montserrat:ital@0;1&family=Poppins&display=swap" rel="stylesheet" />

            </Head>

            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-245F5EGES2"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-245F5EGES2');
            `}
            </Script>

            {children}
        </>
    )
}

export default Layout