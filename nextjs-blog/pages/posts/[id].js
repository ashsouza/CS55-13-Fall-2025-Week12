// pages/posts/[id].js

import Layout from '../../components/layout';
import { getData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getServerSideProps({ params }) {
  // Fetch a single post from WordPress dynamically at request time
  const postData = await getData(params.id);

  // If the post doesn't exist, return a 404 status
  if (!postData || !postData.ID) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.post_title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.post_title}</h1>

        <div className={utilStyles.lightText}>
          <Date dateString={postData.post_date} />
        </div>

        <div
          className={utilStyles.headingMd}
          dangerouslySetInnerHTML={{ __html: postData.post_content }}
        />
      </article>
    </Layout>
  );
}
