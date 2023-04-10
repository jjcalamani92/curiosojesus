import Post from '@/ui/Post';
import React from 'react'
interface Props {
  params: {
    page: string
    slug: string
  }
}
async function getArticles() {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/articles/siteId/${process.env.SITE_UID}`, {method : "GET", cache: 'no-store'});
  if (!res.ok) {
    console.log('error');
  }
  return res.json();
}
async function getArticle(siteId: string, slug: string) {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/articles/article/${siteId}/${slug}`, {method : "GET", cache: 'no-store'});
  if (!res.ok) {
    console.log('error');
  }
  return res.json();
}

export async function generateStaticParams() {
  const pages = await getArticles()
  return pages.map((data: {slug: string}) => ({
    page: 'blog',
    slug: data.slug,
  }));
}

export default async function Page(props: Props) {
  const article = await getArticle(process.env.SITE_UID as string, props.params.slug)
  console.log('article', article)
  return (
    <Post post = {article} />
  )
}
