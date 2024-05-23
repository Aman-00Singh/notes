import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import NoteCard from '../NoteCard/NoteCard'
import { MdAdd } from "react-icons/md";
import AddandEdit from '../AddandEdit/AddandEdit';
import Modal from "react-modal"
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'




const Dashboard = () => {
    const [allNotes, setAllNotes] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [AddEditmodal, setAddEditmodal] = useState({
        isShown: "false",
        type: "add",
        data: "null"
    })
    const navigate = useNavigate();

    const handleEdit = (noteDetails) => { setAddEditmodal({ isShown: true, data: noteDetails, type: "edit" }) }

    const getAllnotes = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/notes/get-all-notes"
            );
            if (!response) {
                console.log("Error in response of getallnotes");
                return;
            }

            if (response.status === 200) {
                setAllNotes(response.data.all_notes);
            }
        } catch (error) {
            console.log("Error in getting all notes", error.message);
            toast.error("Error in getting notes");
            return;
        }
    };

    const getUserInfo = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/user/get-user"
            );
            if (!response) {
                console.log("Error in response of getuser");
                return;
            }

            if (response.status === 200) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            console.log("Error in getting user", error.message);
            toast.error("Error in getting user");
            localStorage.clear();
            navigate("/login");
            return;
        }

    }

    const deleteNote = async (data) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/notes/delete-notes/${data._id}`
            );
            if (!response) {
                console.log("Error in response of deletenotes");
                return;
            }

            if (response.status === 200) {
                toast.success("Note deleted successfully")
                getAllnotes();
            }
        } catch (error) {
            console.log("Error in deleting notes", error.message);
            toast.error("Error in deleting notes");
            return;
        }
    }


    const searchNote = async (query) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/notes/search-notes/${query}`
            );
            if (!response) {
                console.log("Error in response of searching notes");
                return;
            }

            if (response.status === 200) {
                setIsSearch(true);
                setAllNotes(response.data.all_notes);
            }

        } catch (error) {
            console.log("Error in searching notes", error.message);
            toast.error("Error in searching notes");
        }
    }

    const updateIsPinned = async (noteData) => {
        const noteID = noteData._id;
        try {
            const response = await axios.put('http://localhost:3000/api/note/note-isPinned/' + noteID,
                {
                    isPinned: !noteData.isPinned
                });

            if (!response) {
                console.log("Error in response of isPinned");
                return;
            }
            if (response.status === 200) {
                toast.success("Note pinned successfully")
                getAllnotes();
            }

        } catch (error) {
            console.log("Error in isPinned", error.message);
            toast.error("Error in isPinned");
        }
    }

    const handleClearSearch = async () => {
        setIsSearch(false);
        getAllnotes();
    }









    useEffect(() => {
        getUserInfo();
        getAllnotes();
    }, [])

    return (
        <>
            <div>

                <Navbar userInfo={userInfo}

                    searchNote={searchNote} handleClearSearch={handleClearSearch} />
                {allNotes.length > 0 ? (

                    <div className='grid grid-cols-3 gap-4 mt-8'>
                        {allNotes.map((item, index) => {

                            <NoteCard
                                key={item._id}
                                title={item.title}
                                content={item.content}
                                date={item.date}
                                tags={item.tags}
                                isPinned={item.isPinned}
                                OnEdit={() => handleEdit(item)}
                                Ondelete={() => deleteNote(item)}
                                OnPinnedNote={() => updateIsPinned(item)}
                            />

                        })}
                    </div>) : (<EmptyCard />)}

            </div>

            <div>
                <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600" onClick={() => { setAddEditmodal({ isShown: true, type: "add", data: null }) }}>
                    <MdAdd className='text-[32px] text-white' />
                </button>

            </div>

            <Modal
                isOpen={AddEditmodal.isShown}
                OnRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)"
                    }
                }}
                contentLabel=""
                className=""
            >
                <AddandEdit
                    notedata={AddEditmodal.data}
                    type={AddEditmodal.type}
                    OnClose={() => { setAddEditmodal({ isShown: false, type: "add", data: null }) }}
                    getAllnotes={getAllnotes} />
            </Modal>



        </>

    )
}

export default Dashboard
