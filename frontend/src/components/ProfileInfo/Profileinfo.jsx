import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";




const getInitials = (name) => {
  if (!name) return ''
  const words = name.split(' ')
  let initials = ''
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0]
  }
  return initials.toUpperCase()
}
const Profileinfo = ({ onlogout }) => {


  return (

    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>{getInitials("John wick")}</div>

      <div>
        <p className='text-sm font-medium'>John</p>


        <RiLogoutCircleLine className='text-sm text-slate-700' onClick={onlogout} />
      </div>
    </div>

  )
}


export default Profileinfo
