import React, { useState, useCallback } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
// import debounce from 'lodash/debounce'

const InputTags = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("")
    console.log(tags)
    const addnewtag = () => {
        if (inputValue !== "") {
            setTags([...tags, inputValue])
            setInputValue("")
        }
    }
    const handleKeydown = (e) => {
        if (e.key === "Enter") {
            addnewtag();
        }
    }

    const handleRemovetag = (tagtoRemove) => {
        setTags(tags.filter((tag) => tag !== tagtoRemove))
    }


    return (
        <>
            <div className='p-3'>
                {tags?.length > 0 && (
                    <div className=''>
                        {tags?.map((tag, index) => (
                            <div key={index} className="text-md px-3 py-1 gap-2 text-white mt-2 bg-green-500 w-fit rounded-full flex items-center">
                                #{tag}
                                <button onClick={() => { handleRemovetag(tag) }}>
                                    <MdClose />
                                </button>
                            </div>
                        ))}
                    </div>
                )}




            </div>
            <div className='flex items-center p-5'>
            <input
                type="text"
                placeholder='Add tags'
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value) }}
                onKeyDown={handleKeydown} 
                className='text-lg text-slate-950 outline-none p-2 resize-none'
                />

            <button onClick={() => { addnewtag() }}>
                <MdAdd className='text-2xl text-blue-800 font-semibold ' />
            </button>
            </div>
        </>
    )
}

export default InputTags
