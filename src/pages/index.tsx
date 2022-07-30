import type { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import { trpc } from '../utils/trpc'
import { authOptions } from './api/auth/[...nextauth]'

const Home: NextPage = () => {
  const { data, isLoading, error } = trpc.useQuery(['posts.all'])
  if (isLoading) {
    return <Layout title="">Loading...</Layout>
  }

  if (error) {
    return <Layout title="">Error Happened</Layout>
  }
  return (
    <Layout title="" className={styles.App}>
      <div className="grid grid-cols-3 gap-5">
        {data?.map((post) => (
          <div
            className="group cursor-pointer rounded-lg border p-5 hover:border-gray-500 dark:border-gray-500 dark:hover:border-gray-300"
            key={post.id}
          >
            <Link href={`/post/${post.slug}`}>
              <a className="overflow-hidden group-hover:text-indigo-500 group-hover:underline">
                {post.title}
              </a>
            </Link>
            <p className="overflow-hidden truncate">{post.body}</p>
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
