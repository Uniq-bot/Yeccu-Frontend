import PostSearch from '@/components/common/PostSearch'
import { Plus } from 'lucide-react'
import React from 'react'

const PostsAdmin = () => {
  return (
    <div className='w-full min-h-150 border border-yellow-600'>
        <div className='flex justify-between items-center w-full px-5 py-4'>
          <div className='flex flex-col leading-1.5'>
            <h2 className='text-white font-extrabold text-2xl'>
              POSTS
            </h2>
            <p className='text-[13px]'>
              Manage your blog posts
            </p>
          </div>
          <button className='flex items-center  text-black font-bold px-5 py-2 bg-yellow-400'>
            <Plus /> Add Post
          </button>
        </div>
        <div>
          <PostSearch />
        </div>
    </div>
  )
}

export default PostsAdmin