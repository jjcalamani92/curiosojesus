'use client'
import { useGetCategories0ByParentId } from '@/src/hooks/useCategory0';
import { Category } from '@/src/interfaces/category'
import { Page } from '@/src/interfaces/page';
import Link from 'next/link'

import { useRouter, usePathname } from 'next/navigation';
interface Props {
  page: Page
  categories: Category[]
}
export default function ListBlogCategory({page, categories}: Props) {
  const { data:{name, description}, _id} = page
  const pathname = usePathname()
  const { data } = useGetCategories0ByParentId(_id, categories)
  // console.log('data', data)
  return (
    
    <div  className="py-12">
    <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div className="mb-12 space-y-2 text-center">
        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">{name}</h2>
        <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {
          data?.map((category, i) => (

        <div key={i} className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
          <div className="relative overflow-hidden rounded-xl">
            <img src="https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
            alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"/>
          </div>
          <div className="mt-6 relative">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {category.data.name}
            </h3>
            <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
            {category.data.description}
             
            </p>
            <Link className="inline-block" href={`/${pathname}/${category?.slug}`}>
              <span className="text-primary">See More</span>
            </Link>
          </div>
          
        </div>
          ))
        }
        
      </div>
    </div>
  </div>
                                      
  )
}
