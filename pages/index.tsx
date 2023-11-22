import  Pane from '@/components/Pane'
import { wrapper } from '@/store'
import { animeList } from '@/store/services/animeApi'
import { IAnimeResponse } from '@/types'
import { GetServerSideProps, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

export const getServerSideProps:GetServerSideProps<{data:IAnimeResponse}> = wrapper.getServerSideProps((store) => async (context) => {

const { q, limit, page }  = context.query;

const result  = await store.dispatch(animeList.initiate({ q: q?.toString()  ?? '', limit: limit ? +limit: 25, page:  page ? +page : 1}));

const data = await result.data as IAnimeResponse;


return {
  props: {data},
}

});

export default function Home({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>      
    <Head>
        <title>Anime base</title>
        <meta name="description" content="Anime info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Pane data = {...data.data} />
      </>

  )
}
