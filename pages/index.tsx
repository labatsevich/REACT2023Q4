import { LimitPicker } from '@/components/LimitPicker'
import Pagination from '@/components/Pagination'
import Pane from '@/components/Pane'
import { wrapper } from '@/store'
import { animeList, getDetails, getRunningQueriesThunk } from '@/store/services/animeApi'
import { IAnimeResponse, MixedAnimeResponse } from '@/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
export const getServerSideProps: GetServerSideProps<{ data: MixedAnimeResponse }> = wrapper.getServerSideProps((store) => async (context) => {

  const { q, limit, page, id } = context.query;

  const result = await store.dispatch(animeList.initiate({ q: q?.toString() ?? '', limit: limit ? +limit : 25, page: page ? +page : 1 }));
  if (id) await store.dispatch(getDetails.initiate(+id))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  const anime = result.data as IAnimeResponse;
  const { details } = store.getState().app;


  return {
    props: {
      data: {
        anime,
        details
      }
    },
  }

});

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const pagination = data.anime.pagination;
  const details = data.details;

  return (
    <>
      <Head>
        <title>Anime base</title>
        <meta name="description" content="Anime info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <LimitPicker />
        {pagination && <Pagination hasNext={pagination.has_next_page} current={pagination.current_page ?? 1} total={pagination.last_visible_page} />}
        <Pane data={data.anime.data} />
        {details && details.title}

    </>

  )
}
