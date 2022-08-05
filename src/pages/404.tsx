import Layout from '../components/Layout'

function NotFound({ ErrorCode }: { ErrorCode?: string }) {
  return (
    <Layout className="mt-5 px-5" title=" - Not Found">
      <p>Page Nor Found. Error Code : {ErrorCode}</p>
    </Layout>
  )
}

export default NotFound
