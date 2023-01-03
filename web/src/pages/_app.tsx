import '../../styles/globals.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes";
import { ApolloProvider } from '@apollo/client';

import { client } from '../services/apollo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  )
}
