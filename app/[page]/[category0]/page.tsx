import ListBlog from '@/ui/ListBlog';
import ListBlogCategory from '@/ui/ListBlogCategory';
import React from 'react'
interface Props {
  params: {
    page: string
    category0: string
  }
}

async function getCategories() {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/categories0/siteId/${process.env.SITE_UID}`, {method : "GET", cache: 'force-cache'});
  if (!res.ok) {
    console.log('error');
    
  }

  return res.json();
}

async function getCategory(siteId: string, slug: string) {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/categories0/category/${siteId}/${slug}`, {method : "GET", cache: 'force-cache'});
  if (!res.ok) {
    console.log('error');
  }
  return res.json();
}

export async function generateStaticParams() {
  const pages = await getCategories()
  return pages.map((data: {data: {paths: string[]}}) => ({
    page: data.data.paths[0],
    category0: data.data.paths[1],
  }));
}

export default async function Page(props: Props) {
  const category = await getCategory(process.env.SITE_UID as string, props.params.category0)
  // const categories = await getCategories()
  // // console.log('categories', categories)
  return (
    <>
    {
      category.data.type.slug === 'blog' && 
      <ListBlog page={category} />
    }
    {
      category.data.type.slug === 'category' && 
      <ListBlogCategory  page={category} />
    }
    </>
  )
}
