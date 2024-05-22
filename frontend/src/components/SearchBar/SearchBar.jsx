import React from 'react'
import { LuFileSearch } from "react-icons/lu";
import { RiCloseCircleFill } from "react-icons/ri";




const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className='w-80 flex-items-center px-4 bg-slate-100 rounded-md'>
            <input
                className='w-full text-xs bg-transparent py[11px] outline-none'
                type='text'
                placeholder='Search Notes'
                value={value}
                onChange={onChange}
            />

            {value && (
                <RiCloseCircleFill className='text-xl text-slate-400 cursor-pointer hover:text-black mr-3'
                    onClick={onClearSearch} />
            )}


            <LuFileSearch className='text-slate-400 cursor-pointer hover:text-black' onClick={handleSearch} />

        </div>
    )
}

export default SearchBar
