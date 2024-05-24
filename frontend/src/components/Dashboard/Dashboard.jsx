import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import NoteCard from "../NoteCard/NoteCard";
import { MdAdd } from "react-icons/md";
import AddandEdit from "../AddandEdit/AddandEdit";
import Modal from "react-modal";
import toast from "react-hot-toast";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";
import EmptyCard from "../EmptyCard/EmptyCard";
import { useActiveActionContext } from "../../../context/siteContext";
import Login from "../Login/Login";
import {
  FaArchive,
  FaBell,
  FaBookmark,
  FaDoorClosed,
  FaDoorOpen,
  FaRunning,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const Dashboard = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const { userInfo, isLoggedIn } = useActiveActionContext();
  const [AddEditmodal, setAddEditmodal] = useState({
    isShown: false,
    type: "add",
    data: "null",
  });
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setAddEditmodal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getAllnotes = async () => {
    try {
      await axios
        .get("http://localhost:3000/api/notes/get-all-notes", {
          withCredentials: true,
        })
        .then((response) => {
          setAllNotes(response.data.all_notes);
        });
    } catch (error) {
      console.log("Error in getting all notes", error.message);
      toast.error("Error in getting notes");
      return;
    }
  };

  // const getUserInfo = async () => {
  //     try {
  //         const response = await axios.get(
  //             "http://localhost:3000/api/user/getuser",{withCredentials:true}
  //         );
  //         if (!response) {
  //             console.log("Error in response of getuser");
  //             return;
  //         }

  //         // console.log(response);
  //         if (response.status === 200) {
  //             setUserInfo(response.data.user);
  //             // console.log(userInfo);
  //         }

  //     } catch (error) {
  //         console.log("Error in getting user", error.message);
  //         toast.error("Error in getting user");
  //         localStorage.clear();
  //         navigate("/login");
  //         return;
  //     }

  // }

  const deleteNote = async (data) => {
    try {
        // console.log(data._id);
      const response = await axios.delete(
        `http://localhost:3000/api/notes/delete-notes/${data._id}`,{withCredentials:true}
      );
      if (!response) {
        console.log("Error in response of deletenotes");
        return;
      }

      if (response.status === 200) {
        toast.success("Note deleted successfully");
        console.log(response);
        getAllnotes();
      }
    } 
    
    catch (error) {
      console.log("Error in deleting notes", error.message);
      toast.error("Error in deleting notes");
      return;
    }
  };

  const searchNote = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/notes/search-notes/${query}`,{withCredentials:true}
      ).then((response) => {
        setAllNotes(response.data.search_notes);
        // setAllNotes(response.data.all_notes);

        setIsSearch(true);
    });
      
    } catch (error) {
      console.log("Error in searching notes", error.message);
      toast.error("Error in searching notes");
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteID = noteData._id;
    try {
      const response = await axios.put(
        "http://localhost:3000/api/note/note-isPinned/" + noteID,{withCredentials:true},
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (!response) {
        console.log("Error in response of isPinned");
        return;
      }
      if (response.status === 200) {
        toast.success("Note pinned successfully");
        getAllnotes();
      }
    } catch (error) {
      console.log("Error in isPinned", error.message);
      toast.error("Error in isPinned");
    }
  };

  const handleClearSearch = async () => {
    setIsSearch(false);
    getAllnotes();
  };

  const logout = async () => {
    // const navigate = useNavigate();
    await axios.get("http://localhost:3000/api/logout", {
      withCredentials: true,
    });
    // navigate("/login")
    window.location.href = "/login";
  };

  useEffect(() => {
    // getUserInfo();
    getAllnotes();
  }, []);

  // console.log(allNotes);
  return (
    <>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <div>
            <Navbar
              userInfo={userInfo}
              searchNote={searchNote}
              handleClearSearch={handleClearSearch}
            />

            <section className="flex">
              <aside className="w-[18vw] h-full bg-gray-100 border-[1px] m-4 rounded-lg">
                {/* useractions */}
                <section className="text-center p-8">
                  <div className="flex flex-col gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="user"
                      className="w-20 h-20 rounded-full mx-auto"
                    />
                    <h2 className="font-thin text-2xl">Welcome Back,</h2>
                    <h2 className="font-semibold text-2xl">
                      {userInfo.user.fullname.toUpperCase()}
                    </h2>
                  </div>
                </section>
                <section className="mt-5 text-center">
                  <ul>
                    <li className="p-5 border rounded-md text-md font-semibold m-4 flex items-center gap-6 bg-slate-200 hover:bg-slate-300 cursor-pointer">
                      <FaBell className="text-2xl inline-block text-yellow-500" />
                      Reminders
                    </li>
                    <li className="p-5 border rounded-md text-md font-semibold m-4 flex items-center gap-6 bg-slate-200 hover:bg-slate-300 cursor-pointer">
                      <FaBookmark className="text-2xl inline-block" />
                      Saved
                    </li>
                    <li className="p-5 border rounded-md text-md font-semibold m-4 flex items-center gap-6 bg-slate-200 hover:bg-slate-300 cursor-pointer">
                      <FaArchive className="text-2xl inline-block" />
                      Archived
                    </li>
                    <li
                      className="p-5 border rounded-md text-md font-semibold m-4 flex items-center gap-6 bg-slate-200 hover:bg-slate-300 cursor-pointer"
                      onClick={logout}
                    >
                      <CiLogout className="text-2xl inline-block" />
                      Logout
                    </li>
                  </ul>
                </section>
              </aside>


              <aside className="w-[80vw] p-12">
                {allNotes.length === 0 ? (
                  <>
                    <EmptyCard />
                    <button
                      className="flex items-center justify-center p-10 mt-10 ml-10 hover:bg-slate-100"
                      onClick={() => {
                        setAddEditmodal({
                          isShown: true,
                          type: "add",
                          data: null,
                        });
                      }}
                    >
                      <MdAdd className="text-7xl text-black" />
                    </button>
                  </>
                ) : (
                    <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5">
                    {allNotes.map((item) => {
                      return (
                        <NoteCard
                          key={item._id}
                          title={item.title}
                          content={item.content}
                          date={item.createdAt}
                          tags={item.tags}
                          isPinned={item.isPinned}
                          Ondelete={() => {
                            deleteNote(item);
                          }}
                          OnEdit={() => {
                            handleEdit(item);
                          }}
                          OnPinnedNote={() => {
                            updateIsPinned(item);
                          }}
                        />
                      );
                    })}
                  </div>
                    <button
                      className="flex items-center justify-center p-10 mt-10 ml-10 hover:bg-slate-100"
                      onClick={() => {
                        setAddEditmodal({
                          isShown: true,
                          type: "add",
                          data: null,
                        });
                      }}
                    >
                      <MdAdd className="text-7xl text-black transition-all" />
                    </button>
                  </>
                )}
              </aside>
            </section>
          </div>

          <Modal
            isOpen={AddEditmodal.isShown}
            OnRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
              },
            }}
            contentLabel=""
            className=""
          >
            <AddandEdit
              notedata={AddEditmodal.data}
              type={AddEditmodal.type}
              OnClose={() => {
                setAddEditmodal({ isShown: false, type: "add", data: null });
              }}
              getAllnotes={getAllnotes}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default Dashboard;
