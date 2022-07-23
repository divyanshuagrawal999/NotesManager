import React from 'react'
import { useContext, useState } from 'react';
import NoteContext from '../context/Notes/NoteContext';

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;



  //creating a state using useState
  const [note, setNotes] = useState({ title: "", description: "", tag: "" })

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNotes({title:"", description:"", tag:""})
  }
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="container my-4">
        <h4>Add a Note</h4>

        <form className='container my-4'>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" autocomplete = "off" onChange={onChange} value={note.title} minLength={5} required/>
            {/* <div id="emailHelp" className="form-text"></div> */}
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" autocomplete = "off" onChange={onChange} value={note.description} minLength={8} required/>
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" autocomplete = "off" onChange={onChange} value={note.tag} minLength={3} required/>
          </div>

          <button disabled={note.title.length<5 || note.description<8 || note.tag.length<3} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote