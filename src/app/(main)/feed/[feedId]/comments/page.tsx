import { fetchFeeds } from '@/services/feedServices';
import { cookies } from 'next/headers';



export async function generateStaticParams() {
    const cookie = cookies();
    

    const feeds = await fetchFeeds(token)
    console.log(id)
   
    return posts.map((post) => ({
      slug: post.slug,
    }))
  }
   
  // Multiple versions of this page will be statically generated
  // using the `params` returned by `generateStaticParams`
  export default function Page({ params }) {
    const { slug } = params
    // ...
  }