import { Pane } from '@/components/Pane'
import Head from 'next/head'


export default function Home() {
  return (
    <>      
    <Head>
        <title>Anime base</title>
        <meta name="description" content="Anime info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Pane />
      </>

  )
}
