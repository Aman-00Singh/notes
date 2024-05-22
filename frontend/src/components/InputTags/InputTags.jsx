import React, { useState, useCallback } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'
import debounce from 'lodash/debounce'

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
            <div>
                {tags?.length > 0 && (
                    <div className='flex items-center gap-2 flex-wrap mt-2'>
                        {tags?.map((tag, index) => (
                            <span key={index} className="">
                                #{tag}
                                <button onClick={() => { handleRemovetag(tag) }}>
                                    <MdClose />
                                </button>
                            </span>
                        ))}
                    </div>
                )}




            </div>
            <input
                type="text"
                placeholder='Add tags'
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value) }}
                onKeyDown={handleKeydown} />

            <button onClick={() => { addnewtag() }}>
                <MdAdd className='text-2xl text-blue-700 hover:text-white' />
            </button>
        </>
    )
}

export default InputTags
