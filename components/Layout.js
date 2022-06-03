import Head from 'next/head'

function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Correio Elegante Online</title>

                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta name="description" content="Um serviço de correio elegante online para whatsapp" />
                <meta name="keywords" content="correio elegante, online, whatsapp, anonimo, amor, carinho, festa junina, dia dos namorados" />
                <meta name="reply-to" content="khaue.po@hotmail.com" />
                <meta name="robots" content="index,follow" />
                <meta httpEquiv="content-language" content="pt-br" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:title" content="Correio Elegante Online" />
                <meta property="og:type" content="website" />
                <meta property="og:description" content="Um serviço de correio elegante online para whatsapp" /> 
                <meta property="og:url" content="https://correio.khaue.com.br" />
                <meta property="og:image" content="https://correio.khaue.com.br" />
                <meta property="og:site_name" content="Correio Elegante Online" />
                <meta property="og:locale" content="pt_BR" />

                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6296770603213727" crossOrigin="anonymous"></script>
            </Head>

            {children}
        </>
    )
}

export default Layout