export const revalidate = 10

import ListBlogCategory from '@/ui/ListBlogCategory';
import React from 'react'

interface Props {
  params: {
    page: string
  }
}

async function getPages() {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/pages/parentId/${process.env.SITE_UID}`, {method : "GET", cache: 'force-cache'});
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    console.log('error');
    
  }

  return res.json();
}

async function getPage(siteId: string, slug: string) {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/pages/page/${siteId}/${slug}`, {method : "GET", cache: 'force-cache'});
  if (!res.ok) {
    console.log('error');
  }
  return res.json();
}

 async function getCategories(parentId: string) {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/categories0/parentId/${parentId}`, {method : "GET", cache: 'force-cache', });
  if (!res.ok) {
    console.log('error');
  }
  return res.json();
}

export async function generateStaticParams() {
  // addSite('portfolio', {name: 'asd', uid: '123', type: 'portfolio'})
  const pages = await getPages()
  return pages.map((data: {slug: string}) => ({
    page: data.slug,
  }));
}

export default async function Page(props: Props) {
  const page = await getPage(process.env.SITE_UID as string, props.params.page)
  const categories = await getCategories(page._id)
  // console.log('categories', categories)
  return (
    <ListBlogCategory  page={page} categories={categories} />
  )
}
