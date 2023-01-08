import Head from "next/head"
import ContextProvider from "../components/ContextProvider"
import "../styles/globals.css"

const MyApp = ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <Component {...pageProps} />
      <Head>
        <title>TodoList</title>
      </Head>
    </ContextProvider>
  )
}

export default MyApp
