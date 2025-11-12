import Layout from '../../components/layout';
// FIX: Changed the import name from getPostData to getData to match the export in lib/posts.js
import { getAllPostIds, getData } from '../../lib/posts'; 
import Head from 'next/head';
import Date from '../../components/date'; 
import utilStyles from '../../styles/utils.module.css'; 

// This function fetches data for each individual post at build time.
// It receives `params` containing the post's ID.
export async function getStaticProps({ params }) {
 // FIX: Call the correctly imported function: getData
 const postData = await getData(params.id);

 // Return the fetched data as props for the page component.
 return {
     props: {
     postData,
   },
 };
}

// This function determines which paths to pre-render for all blog posts.
// It runs at build time.
export async function getStaticPaths() {
 // Get the IDs of all available posts.
  // Note: getAllPostIds is an async function in your posts.js
 const paths = await getAllPostIds();
 return {
 // Return the list of paths to be pre-rendered.
 paths,
 // `fallback: false` means that any path not returned by `getStaticPaths`
    // will result in a 404 page.
 fallback: false,
};
}

// This is the default component for the blog post page.
// It receives `postData` as a prop from `getStaticProps`.
export default function Post({ postData }) {
  return (
 // Wrap the page content with the custom Layout component.
   <Layout>
    <Head>
         <title>{postData.post_title}</title>
      </Head>
      <article>
       <h1 className={utilStyles.headingXl}>{postData.post_title}</h1>

        <div className={utilStyles.lightText}>
          <Date dateString={postData.post_date} />
        </div>
        <div className={utilStyles.headingMd} dangerouslySetInnerHTML={{ __html: postData.post_content }} />
      </article>
    </Layout>
   );
}