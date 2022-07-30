import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage = () => {
  const { data, isLoading, error } = trpc.useQuery(["posts.all"]);
  if (isLoading) {
    return (
      <Layout className="max-w-7xl mx-auto" title="Blog">
        Loading...
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout className="max-w-7xl mx-auto" title="Blog">
        Error Happened
      </Layout>
    );
  }
  return (
    <Layout title="Blog" className={styles.App}>
      {data?.map((post) => (
        <div key={post.id}>
          <Link href={`/post/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
          <p>{post.body}</p>
        </div>
      ))}
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  return {
    props: { session },
  };
};
