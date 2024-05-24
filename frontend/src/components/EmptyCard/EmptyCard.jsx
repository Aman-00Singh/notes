import React from 'react'
import { CgNotes } from "react-icons/cg";
const EmptyCard = () => {
    return (
        <>
            <div className='flex items-center text-2xl font-semibold gap-3'>
                <CgNotes  className='text-3xl'/>
                <h2>Create Your First Note!</h2>
            </div>
        </>
    )
}

export default EmptyCard
