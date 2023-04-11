export const dynamic = 'force-dynamic'
export const revalidate = 60

import ListBlogCategory from '@/ui/ListBlogCategory';
import React from 'react'

interface Props {
  params: {
    page: string
  }
}

async function getPages() {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/pages/parentId/${process.env.SITE_UID}`, {method : "GET",});
  if (!res.ok) {
    console.log('error');
    
  }

  return res.json();
}

async function getPage(siteId: string, slug: string) {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/pages/page/${siteId}/${slug}`, {method : "GET", });
  if (!res.ok) {
    console.log('error');
  }
  return res.json();
}

//  async function getCategories(parentId: string) {
//   const res = await fetch(`${process.env.SITE_URL}/api/portfolio/categories0/parentId/${parentId}`, {method : "GET", cache: 'no-store', });
//   if (!res.ok) {
//     console.log('error');
//   }
//   return res.json();
// }

export async function generateStaticParams() {
  const pages = await getPages()
  return pages.map((data: {slug: string}) => ({
    page: data.slug,
  }));
}

export default async function Page(props: Props) {
  const page = await getPage(process.env.SITE_UID as string, props.params.page)
  // console.log('page', page)
  // const categories = await getCategories(page._id)
  // console.log('categories', categories)
  return (
    <ListBlogCategory  page={page} />
  )
}
