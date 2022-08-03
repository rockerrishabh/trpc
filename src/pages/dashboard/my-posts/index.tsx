import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import Layout from '../../../components/Layout'
import { trpc } from '../../../utils/trpc'
import { authOptions } from '../../api/auth/[...nextauth]'

const MyPosts: NextPage = () => {
  const { data, isLoading, error } = trpc.useQuery(['posts.my-posts'])
  if (isLoading) {
    return <Layout title="">Loading...</Layout>
  }

  if (error) {
    return <Layout title="">Error Happened</Layout>
  }
  return (
    <Layout title="" className="px-2 md:px-5">
      <div className="grid grid-rows-1 gap-2 overflow-hidden md:grid-cols-3 md:gap-5">
        {data?.map((post) => (
          <div
            className="group cursor-pointer overflow-hidden rounded-lg border p-3 hover:border-gray-500 dark:border-gray-500 dark:hover:border-gray-300 md:p-5"
            key={post.id}
          >
            <Link href={`/post/${post.slug}`}>
              <a className="line-clamp-3 group-hover:text-indigo-500 group-hover:underline">
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

export default MyPosts

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
