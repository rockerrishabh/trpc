import type { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import { trpc } from '../../../utils/trpc'
import { authOptions } from '../../api/auth/[...nextauth]'
import {
  MdOutlineModeEdit,
  MdOutlinePublish,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from 'react-icons/md'
import toast from 'react-hot-toast'
import { IoTrash } from 'react-icons/io5'
import NotFound from '../../404'

const MyPosts = () => {
  const router = useRouter()
  const { data, isLoading, error } = trpc.useQuery(['posts.my-posts'])
  const utils = trpc.useContext()
  const deletePost = trpc.useMutation('posts.delete', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(['posts.my-posts'])
      await utils.invalidateQueries(['posts.all'])
      await utils.invalidateQueries(['posts.bySlug'])
    },
  })

  const handleDeleteClick = (id: string) => {
    try {
      deletePost.mutateAsync({ id })
      toast.success('Successfully Deleted')
      router.push('/dashboard/my-posts')
    } catch (error) {
      toast.error('Error while Deleting...')
    }
  }

  const publishPost = trpc.useMutation('posts.publish-post', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(['posts.bySlug'])
      await utils.invalidateQueries(['posts.all'])
      await utils.invalidateQueries(['posts.my-posts'])
    },
  })

  const handlePublishClick = (id: string) => {
    try {
      publishPost.mutateAsync({ id })
      toast.success('Successfully Published')
    } catch (error) {
      toast.error('Error while Publishing...')
    }
  }

  const unPublishPost = trpc.useMutation('posts.unpublish-post', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(['posts.bySlug'])
      await utils.invalidateQueries(['posts.all'])
      await utils.invalidateQueries(['posts.my-posts'])
    },
  })

  const handleUnPublishClick = (id: string) => {
    try {
      unPublishPost.mutateAsync({ id })
      toast.success('Successfully Un-Published')
    } catch (error) {
      toast.error('Error while Un-Publishing...')
    }
  }
  if (isLoading) {
    return <Layout title="">Loading...</Layout>
  }

  if (error) {
    return <NotFound ErrorCode={error.message} />
  }
  return (
    <Layout title="" className="mt-5 px-5">
      <Link href="/dashboard/my-posts/create">
        <a className="mb-4 flex w-full justify-end px-4">Create a new Post</a>
      </Link>
      <div className="grid grid-rows-1 gap-2 space-y-3 overflow-hidden md:grid-cols-1 md:gap-5">
        {data?.map((post) => (
          <div
            className="group flex cursor-pointer flex-col space-y-3 overflow-hidden rounded-lg border p-3 hover:border-gray-500 dark:border-gray-500 dark:hover:border-gray-300 md:p-5"
            key={post.id}
          >
            <div className="flex w-full items-center justify-between">
              <Link href={`/post/${post.slug}`}>
                <a className="text-xl font-medium line-clamp-3 group-hover:text-indigo-500 group-hover:underline">
                  {post.title}
                </a>
              </Link>
              <div className="flex items-center space-x-2">
                {post.published === true ? (
                  <>
                    <MdOutlinePublishedWithChanges
                      title="Published"
                      className="h-5 w-5 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white"
                    />
                    <MdOutlineUnpublished
                      title="Un-Publish"
                      onClick={() => handleUnPublishClick(post.id)}
                      className="h-5 w-5 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white"
                    />
                  </>
                ) : (
                  <MdOutlinePublish
                    title="Publish"
                    onClick={() => handlePublishClick(post.id)}
                    className="h-5 w-5 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white"
                  />
                )}

                <Link href={`/dashboard/my-posts/${post.slug}/edit`}>
                  <MdOutlineModeEdit
                    title="Edit"
                    className="h-5 w-5 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white"
                  />
                </Link>
                <IoTrash
                  title="Delete"
                  onClick={() => handleDeleteClick(post.id)}
                  className="h-5 w-5 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white"
                />
              </div>
            </div>
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
