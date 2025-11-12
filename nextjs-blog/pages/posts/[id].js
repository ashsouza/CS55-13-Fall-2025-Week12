import Layout from '../../components/layout';
import { getAllIds, getData } from '../../lib/posts'; 
import Head from 'next/head';
import Date from '../../components/date'; 
import utilStyles from '../../styles/utils.module.css'; 


export async function getStaticProps({ params }) {
 const postData = await getData(params.id);

 return {
     props: {
     postData,
   },
 };
}

// This function determines which paths to pre-render for all blog posts.
export async function getStaticPaths() {
 // Get the IDs of all available posts.
 const paths = await getAllIds();
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