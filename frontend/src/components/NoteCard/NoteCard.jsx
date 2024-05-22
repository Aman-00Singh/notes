import React from 'react'
import moment from 'moment'
import { TbPinned } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const NoteCard = ({ title, content, date, tags, isPinned, Ondelete, OnEdit, OnPinnedNote }) => {
    return (
        <>
            <div>
                <h2>{title}</h2>
                <span>{moment(date).format("MMM Do YY")}</span>
            </div>

            <div>{content?.slice(0, 60)}</div>
            <div>
                {tags.map((item) => `#${item}`)}
            </div>
            <div>
                //pin ka color change
                <button>
                    <TbPinned onClick={OnPinnedNote} />
                </button>

            </div>

            <div>
                <button><FaRegEdit onClick={OnEdit} /></button>
            </div>
            <div>
                <button><RiDeleteBin5Line onClick={Ondelete} /></button>
            </div>
        </>
    )
}

export default NoteCard
