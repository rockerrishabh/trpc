import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loading/Loader'
import { trpc } from '../../utils/trpc'
import NotFound from '../404'
import { authOptions } from '../api/auth/[...nextauth]'

function Post() {
  const router = useRouter()
  const slug = router.query.slug as string
  const { data: session } = useSession()
  const { data, isLoading, error } = trpc.useQuery(['posts.bySlug', { slug }])
  if (error) {
    return <NotFound ErrorCode={error.message} />
  }
  return (
    <Layout className="mt-5 px-5" title={` - ${data?.title}`}>
      <div>
        {isLoading && <Loader />}
        {data && data.published === true && (
          <>
            <h2 className="text-2xl font-medium text-blue-500 hover:text-red-500">
              {data?.title}
            </h2>
            <p>{data?.body}</p>
          </>
        )}
        {data && data.published === false && session && (
          <>
            <h2 className="text-2xl font-medium text-blue-500 hover:text-red-500">
              {data?.title}
            </h2>
            <p>{data?.body}</p>
          </>
        )}
      </div>
    </Layout>
  )
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
