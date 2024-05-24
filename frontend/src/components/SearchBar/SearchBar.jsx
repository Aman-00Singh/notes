import React from 'react'
import { LuFileSearch } from "react-icons/lu";
import { RiCloseCircleFill } from "react-icons/ri";




const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className='w-[500px] flex p-4 items-center  bg-slate-100 rounded-md'>
            <input
                className='w-full text-sm bg-transparent py[11px] outline-none '
                type='text'
                placeholder='Search Notes'
                value={value}
                onChange={onChange}

            />

            {value && (
                <RiCloseCircleFill className=' text-slate-400 cursor-pointer hover:text-black mr-3'
                    onClick={onClearSearch} />
            )}


            <LuFileSearch className='text-2xl text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />

        </div>
    )
}

export default SearchBar
