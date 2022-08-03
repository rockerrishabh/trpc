import { Controller, useForm } from 'react-hook-form'
import { trpc } from '../../../../utils/trpc'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../../api/auth/[...nextauth]'
import toast from 'react-hot-toast'
import { EditPostInput } from '../../../../server/schema/post.schema'
import { useRouter } from 'next/router'
import Layout from '../../../../components/Layout'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Loader from '../../../../components/Loading/Loader'

function Edit() {
  const router = useRouter()
  const utils = trpc.useContext()
  const { data: session, status } = useSession()
  const slug = router.query.slug as string
  const { data, isLoading, error } = trpc.useQuery(['posts.bySlug', { slug }])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPostInput>()

  if (status === 'loading') {
    return (
      <Layout title="- Edit Post">
        <Loader />
      </Layout>
    )
  }

  if (session) {
    const addPost = trpc.useMutation('posts.edit', {
      async onSuccess() {
        // refetches posts after a post is added
        await utils.invalidateQueries(['posts.all'])
      },
    })

    const onSubmit = async (data: EditPostInput): Promise<void> => {
      try {
        await addPost.mutateAsync(data)
        toast.success('Successfully Updated')
        reset()
        router.push('/dashboard/my-posts')
      } catch (error) {
        toast.error('Error while Updating')
      }
    }
    return (
      <Layout title="- Edit Post" className="mx-auto max-w-[80rem]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 flex flex-col space-y-4"
        >
          <div className="flex space-x-5">
            <label htmlFor="title">Title: </label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <input
                  onChange={onChange}
                  defaultValue={data?.title}
                  onBlur={onBlur}
                  className="flex-1 rounded-md border border-gray-400 py-1 px-2 outline-none focus:border-0 focus:ring focus:ring-blue-500 dark:bg-slate-700"
                  name="title"
                  type="text"
                />
              )}
              name="title"
              rules={{ required: true }}
              defaultValue={data?.title}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <input
                  defaultValue={data?.slug}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="hidden"
                />
              )}
              name="id"
              defaultValue={data?.id}
            />
          </div>
          <div className="flex space-x-5">
            <label htmlFor="slug">Slug: </label>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <input
                  onChange={onChange}
                  onBlur={onBlur}
                  defaultValue={data?.slug}
                  className="flex-1 rounded-md border border-gray-400 py-1 px-2 outline-none focus:border-0 focus:ring focus:ring-blue-500 dark:bg-slate-700"
                  name="slug"
                  type="text"
                />
              )}
              name="slug"
              rules={{ required: true }}
              defaultValue={data?.slug}
            />
          </div>
          <div className="flex space-x-2">
            <label htmlFor="featuredImage">Image: </label>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <input
                  onChange={onChange}
                  onBlur={onBlur}
                  defaultValue={data?.featuredImage}
                  className="flex-1 rounded-md border border-gray-400 py-1 px-2 outline-none focus:border-0 focus:ring focus:ring-blue-500 dark:bg-slate-700"
                  name="featuredImage"
                  type="text"
                />
              )}
              name="featuredImage"
              rules={{ required: true }}
              defaultValue={data?.featuredImage}
            />
          </div>
          <div className="flex space-x-4">
            <label htmlFor="body">Body: </label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <textarea
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched
                  defaultValue={data?.body}
                  className="flex-1 rounded-md border border-gray-400 py-1 px-2 outline-none focus:border-0 focus:ring focus:ring-blue-500 dark:bg-slate-700"
                  name="body"
                />
              )}
              name="body"
              rules={{ required: true }}
              defaultValue={data?.body}
            />
          </div>
          <button
            className="rounded-md bg-cyan-500 py-3 text-white hover:bg-cyan-400"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Layout>
    )
  }

  return null
}

export default Edit

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: { session },
  }
}
