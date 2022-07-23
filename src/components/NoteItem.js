import React, { useContext } from 'react'
import NoteState from '../context/Notes/NoteState'
import NoteContext from '../context/Notes/NoteContext';
// import { useState } from 'react';

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(NoteContext)
    const { deleteNote }= context

    return (
        <div className="col-md-3">
            {/* {note.title}
            <br />
            {note.description} */}

            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-item-center">
                        <h5 className="card-title">{note.title}</h5>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                </div>
            </div>
        </div >

    )
}

export default NoteItem