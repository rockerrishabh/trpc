import Link from 'next/link'
import Layout from '../../components/Layout'

function Dashboard() {
  return (
    <Layout className="mt-5 px-5" title=" - Dashboard">
      <div className="flex justify-between">
        <p>Dashboard</p>
        <Link href="/dashboard/my-posts">
          <a>My Posts</a>
        </Link>
      </div>
    </Layout>
  )
}

export default Dashboard
