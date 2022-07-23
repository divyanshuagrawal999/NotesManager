import React, { useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../context/Notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
// import { cleanup } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(NoteContext);

    const { notes, addNote, getNote, editNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNote()}
        else{
            navigate('/login')
        }
    }, [])


    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNotes] = useState({ etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNotes({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag : currentNote.tag })
    }

    const handleClick = (e) => {
        console.log("updating the note... ",note)
        editNote(note.id, note.etitle, note.edescription, note.etag )
        // e.preventDefault();
        refClose.current.click();
        // addNote(note.title, note.description, note.tag)
    }

    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }

    return (
        // <div>Notes</div>
        <div>
            <AddNote />

            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">



                            <form className='container my-3'>

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                    {/* <div id="emailHelp" className="form-text"></div> */}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={8} required/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value = {note.etag} onChange={onChange} minLength={3} required />
                                </div>

                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button> */}
                            </form>



                        </div>
                        <div class="modal-footer">
                            <button type="button" ref={refClose} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} class="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className='notes'>
                <div className="row my-3">
                    <h4>Your Notes</h4>
                    <div className="container" mx-1>
                    {notes.length===0 && "No notes to display"}
                    </div>
                    {notes.map((note) => {
                        // return note.title;
                        //instead of sending a title i will pass noteitem component
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    })}

                </div>
            </div>
        </div>
    )
}

export default Notes