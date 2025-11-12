import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedList } from '../lib/posts';

export async function getStaticProps() {
  const allData = await getSortedList();
  return {
    props: {
      allData
    }
  }
}
export default function Home({ allData }) {
  return (
      <Layout home>
      <h1>List of Names</h1>
      <div className="list-group">
        {allData.map(({ id, name }) => (
          <div key={id}>
            <Link 
              href={`/${id}`}
              className="list-group-item list-group-item-action"
            >
              {name}
            </Link>
            <br />
          </div>
          ))}
        </div>
      </Layout>
  );
}
