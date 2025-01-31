'use client'
import React from 'react'

const Footer = () => {
  return (
    <footer className=' bg-blue-600 flex justify-around p-8 text-white fixed bottom-0 w-full'>
      <div className=' flex flex-col items-center'>
        <h2 className=' text-3xl font-medium'>Welcome to work manager</h2>
        <p>This is a work manager platform where you list-down all important task and manage them effectively.</p>
      </div>

      <ul className=' flex flex-col items-center'>
        <div className=' text-2xl font-medium'>
            Important Links
        </div>
        <li>
            <a href='#!'>Facebook</a>
        </li>
        <li>
            <a href='#!'>Youtube</a>
        </li>
        <li>
            <a href='#!'>Instagram</a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
