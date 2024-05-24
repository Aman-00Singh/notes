import React from "react";
import moment from "moment";
import { CiBookmark } from "react-icons/ci";
import { TbPinned } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const NoteCard = ({
  title,
  content,
  date,
  tags,
  isPinned,
  Ondelete,
  OnEdit,
  OnPinnedNote,
}) => {
  return (
    <main className="border-2 rounded-lg bg-gray-200">
      <section className="">
        <div className="p-4 flex  justify-between font-semibold bg-slate-500 text-white">
          <div className="">
            <h2 className="text-xl">{title}</h2>
            <span className="text-xs font-thin">
              📅{moment(date).format("MMM Do YY")}
            </span>
          </div>
          <button>
            <RiDeleteBin5Line
              className="text-2xl text-red-300 outline-none hover:text-red-400"
              onClick={Ondelete}
            />
          </button>
        </div>
      </section>

      <div className="p-4  font-thin text-2xl">{content?.slice(0, 60)}</div>
      <div className="p-5 ">
        <ul className="flex">
          {tags.map((item) => (
            <li
              key={item}
              className="text-md m-1 flex items-center justify-start bg-green-500 w-fit text-white px-4 rounded-full text-[15px]"
            >
              # {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-around p-4 bg-gray-300">
        <button className="text-xl flex items-center gap-2">
          <CiBookmark onClick={OnPinnedNote} />
        </button>
        <div>
          <button className="flex items-center gap-2 text-xl text-black/50">
            <FaRegEdit onClick={OnEdit} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default NoteCard;
