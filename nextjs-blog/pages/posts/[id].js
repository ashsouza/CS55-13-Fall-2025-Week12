import Layout from '../../components/layout';
// FIX: Adjusted import path to ensure Next.js can find the lib directory
import { getAllPostIds, getPostData } from '../../lib/posts'; 
import Head from 'next/head';
import Date from '../../components/date'; // Added missing Date component import from previous version
import utilStyles from '../../styles/utils.module.css'; // Added missing utility styles import

// This function fetches the data for each posts at build time
// receives `params` containing the post's ID.
export async function getStaticProps({ params }) {
 // Fetch the post data based on the ID from the URL.
 const postData = await getPostData(params.id);

   return {
     props: {
       postData,
     },
  };
}

export async function getStaticPaths() {
  const paths = await getAllPostIds(); 
   return {
     paths,
     fallback: false,
   };
}

export default function Post({ postData }) {
  return (
     <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {/* FIX: Use the correct prop name for the date string */}
        <Date dateString={postData.date} /> 
         </div>
           <div className={utilStyles.headingMd} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
 </article>
    </Layout>
  );
}