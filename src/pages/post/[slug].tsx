import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loading/Loader'
import { trpc } from '../../utils/trpc'
import { authOptions } from '../api/auth/[...nextauth]'

function Post() {
  const router = useRouter()
  const slug = router.query.slug as string
  const { data: session } = useSession()
  const { data, isLoading, error } = trpc.useQuery(['posts.bySlug', { slug }])
  if (error) {
    return router.push('/404')
  }

  if (isLoading) {
    return (
      <Layout title="">
        <Loader />
      </Layout>
    )
  }

  if (data) {
    return (
      <Layout title={` - ${data?.title}`}>
        <div>
          <h2 className="text-2xl text-blue-500 hover:text-red-500">
            {data?.title}
          </h2>
          <p>{data?.body}</p>
        </div>
      </Layout>
    )
  }
  return router.push('/404')
}

export default Post

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )
  return {
    props: { session },
  }
}
