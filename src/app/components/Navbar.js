"use client"

import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-blue-600 flex justify-between px-12 py-2 items-center h-[3rem]'>
      <div className=' cursor-pointer text-white font-bold text-2xl'>
        <Link href={'/'}>
            Work Manager
        </Link>
      </div>

      <div className=' hidden md:flex space-x-10 font-semibold text-xl'>
        <Link href={'/'} className=' hover:text-black transition duration-500'>Home</Link>
        <Link href={'/add-task'} className=' hover:text-black transition duration-500'>Add Task</Link>
        <Link href={'/show-task'} className=' hover:text-black transition duration-500'>Show Task</Link>
      </div>

      <div className=' space-x-4 font-semibold text-xl'>
        <button className=' hover:text-black transition duration-500'>Login</button>
        <button className=' hover:text-black transition duration-500'>SignUp</button>
      </div>
    </nav>
  )
}

export default Navbar
