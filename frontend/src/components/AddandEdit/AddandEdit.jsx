import React, { useState } from 'react'
import InputTags from '../InputTags/InputTags'
import { MdClose } from 'react-icons/md'
import axios from 'axios'
// import { get } from 'lodash'
// import { on } from 'nodemon'

import toast from 'react-hot-toast'
const AddandEdit = ({ notedata, type, OnClose, getAllnotes }) => {
    const [title, setTitle] = useState(notedata?.title || "")
    const [content, setContent] = useState(notedata?.content || "")
    const [tags, setTags] = useState(notedata?.tags || [])
    const [error, setError] = useState(null)

    //edit note api
    const editnote = async () => {
        try {
            const data = { title, content, tags }
            const response = await axios.put(`http://localhost:3000/api/notes/edit-notes/${notedata._id}`, data, {withCredentials: true})
            if (response.status === 200) {
                console.log("Note updated successfully")
                toast.success("Note updated successfully")
                OnClose()
                getAllnotes();
            }
        } catch (error) {
            console.log("Error in updating note", error.message)
            toast.error("Error in updating note")
        }
    }

    //add note api
    const addnewnote = async () => {
        try {
            const data = { title, content, tags }
            const response = await axios.post("http://localhost:3000/api/notes/add-notes", data, { withCredentials: true })
            if (response.status === 201) {
                console.log("Note added successfully")
                toast.success("Note added successfully")
                OnClose()
                getAllnotes();

            }
        } catch (error) {
            console.log("Error in adding note", error.message)
            toast.error("Error in adding note")

        }
    }

    const handleAddEditNote = () => {
        if (!title) {
            setError("Plz enter the title")
        }

        if (!content) {
            setError("Plz enter the content")
        }

        setError("")

        if (type === "edit") {
            editnote()
        }
        else {
            addnewnote()
        }
    }






    return (
        <main className=''>
            <section className='flex text-xl p-5 justify-between bg-slate-200'>
            <h2>Add a Task</h2>
            <button onClick={OnClose}>
                <MdClose className='text-3xl text-black/50 transition-all hover:text-black'/>
            </button>
            </section>


            <div className='flex flex-col gap-2 p-5'>
                <label className='input-label font-semibold'>Title</label>
                <input
                    className='text-xl text-slate-950 outline-none border p-2 rounded-md'
                    type="text"
                    placeholder='Enter Task Name'
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }} />
            </div>

            <div className='flex flex-col gap-2 mt-4 p-5'>
                <label className='input-label font-semibold'>Content</label>
                <textarea type="text"
                    placeholder='Write the task content here'
                    rows={10}
                    value={content}
                    onChange={(e) => { setContent(e.target.value) }}
                    className='text-lg text-slate-950 outline-none border p-2 rounded-md w-full h-40 resize-none'
                    >
                </textarea>
            </div>

            <div className='mt-3 p-5'>
                <label className='input-label font-semibold'>Tags</label>
                <InputTags tags={tags} setTags={setTags} />
            </div>

            {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}


            <button onClick={handleAddEditNote} className='p-3 rounded-full font-semibold cursor-pointer ml-10 bg-slate-400 w-[100px] transition-all hover:w-[150px]'>{type === 'edit' ? 'UPDATE' : 'ADD'}</button>
        </main>
    )
}

export default AddandEdit
