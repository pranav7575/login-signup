import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-12 text-center">
      <div className="container mx-auto flex flex-row items-center justify-center gap-4">
        
        <p>TY IT B | Roll No: 54</p>
        <p className="font-bold text-lg">Pranav Jadhav</p>
        <p>Cloud Computing</p>
      </div>
      <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} All Rights Reserved</p>
    </footer>
  )
}

export default Footer