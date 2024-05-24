import {React, useState} from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};
const Profileinfo = ({ userInfo }) => {

  const [showDialog, setShowDialog] = useState(false);

  // console.log(userInfo);

  const logout = async () => {
    // const navigate = useNavigate();
    await axios.get("http://localhost:3000/api/logout", {
      withCredentials: true,
    });
    // navigate("/login")
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full border-[1px] text-slate-950 font-medium bg-slate-100"
        onClick={() => {
          showDialog ? setShowDialog(false) : setShowDialog(true);
        }}
      >
        {getInitials(userInfo.user.fullname)}
      </div>
      {/* <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>amn</div> */}

      <div>

            <dialog
              open={showDialog}
              className="left-[70vw] top-20 h-[300px] w-[310px] p-2 border-2"
            >
              <section className="flex flex-col justify-center">
                <div className="flex items-end justify-end ">
                  <IoMdClose
                    className="text-2xl cursor-pointer opacity-50 hover:opacity-100"
                    onClick={() => setShowDialog(false)}
                  />
                </div>
                <div className="flex items-center justify-center flex-col p-2 gap-3">
                  {/* <h1 className="text-3xl"><FaUser/></h1> */}
                  <p className="border-2 rounded-full p-3 w-[65px] bg-sky-500 text-3xl text-white flex items-center justify-center">{getInitials(userInfo.user.fullname)}</p>
                  <h1 className="text-lg">
                    {" "}
                    <span className="font-semibold text-lg">{userInfo.user.fullname}</span>
                  </h1>
                </div>
                <hr></hr>
                <section className="p-3">
                  <ul className="flex flex-col gap-3 ">
                    <li className="hover:underline hover:font-semibold cursor-pointer p-1">
                      Profile
                    </li>
    
                    <li
                      className="hover:underline hover:font-semibold cursor-pointer p-1"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </section>
              </section>
            </dialog>
      </div>
    </div>
  );
};

export default Profileinfo;
