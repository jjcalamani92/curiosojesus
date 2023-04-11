import ListBlog from '@/ui/ListBlog';
import ListBlogCategory from '@/ui/ListBlogCategory';

interface Props {
  params: {
    page: string
    category0: string
    category1: string
    category2: string
  }
}

async function getCategories() {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/categories2/siteId/${process.env.SITE_UID}`, {method : "GET", cache: 'no-store'});
  if (!res.ok) {
    console.log('error');
  }

  return res.json();
}

async function getCategory(siteId: string, slug: string) {
  const res = await fetch(`${process.env.SITE_URL}/api/portfolio/categories2/category/${siteId}/${slug}`, {method : "GET", cache: 'no-store'});
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
    category1: data.data.paths[2],
    category2: data.data.paths[3],
  }));
}

export default async function Page(props: Props) {
  const category = await getCategory(process.env.SITE_UID as string, props.params.category2)
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
