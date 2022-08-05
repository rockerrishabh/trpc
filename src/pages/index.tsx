import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import Layout from '../components/Layout'
import { trpc } from '../utils/trpc'
import NotFound from './404'
import { authOptions } from './api/auth/[...nextauth]'

const Home: NextPage = () => {
  const { data, isLoading, error } = trpc.useQuery(['posts.all'])
  if (isLoading) {
    return <Layout title="">Loading...</Layout>
  }

  if (error) {
    return <NotFound ErrorCode={error.message} />
  }
  return (
    <Layout title="" className="mt-5 px-5">
      <div className="md:grid-row-1 grid grid-rows-1 gap-2 space-y-3 overflow-hidden px-4 md:gap-5">
        {data?.map((post) => (
          <div
            className="group flex cursor-pointer flex-col space-y-3 overflow-hidden rounded-md border p-3 hover:border-gray-500 dark:border-gray-500 dark:hover:border-gray-300 md:p-5"
            key={post.id}
          >
            <Link href={`/post/${post.slug}`}>
              <a className="text-xl font-medium line-clamp-3 group-hover:text-indigo-500 group-hover:underline">
                {post.title}
              </a>
            </Link>
            <p className="line-clamp-3">{post.body}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Home

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
