import React, { useState } from 'react'
import InputTags from '../InputTags/InputTags'
import { MdClose } from 'react-icons/md'
import { get } from 'lodash'
import { on } from 'nodemon'

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
            const response = await axios.put(`http://localhost:3000/api/notes/edit-notes/${notedata._id}`, data)
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
            const response = await axios.post("http://localhost:3000/api/notes/add-notes", data)
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
        <>
            <button onClick={OnClose}>
                <MdClose />
            </button>


            <div className='flex flex-col gap-2'>
                <label className='input-label'>Title</label>
                <input
                    className='text-2xl text-slate-950 outline-none'
                    type="text"
                    placeholder='title'
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }} />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>Content</label>
                <textarea type="text"
                    placeholder='Content'
                    rows={10}
                    value={content}
                    onChange={(e) => { setContent(e.target.value) }}>
                </textarea>
            </div>

            <div className='mt-3'>
                <label className='input-label'>Tags</label>
                <InputTags tags={tags} setTags={setTags} />
            </div>

            {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}


            <button onClick={handleAddEditNote}>{type === 'edit' ? 'UPDATE' : 'ADD'}</button>
        </>
    )
}

export default AddandEdit
