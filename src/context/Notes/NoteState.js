import react, { useState } from "react";
import NoteContext from "./NoteContext";  //importing notecontext api 

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    // const s1={
    //     "name": "Divyanshu",
    //     "class": "5b"
    // }
    // const [state, setstate] = useState(s1)
    // const update = () =>{
    //     setTimeout(()=>{
    //         setstate({
    //             "name": "div",
    //             "class": "10b"
    //         })
    //     },3000);
    // }

    const [notes, setNotes] = useState(notesInitial)





    //Getall note
    const getNote = async() => {
        //to do api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            
        });
        const json = await response.json();        
        console.log(json)
        setNotes(json);
    }




    //Add a note
    const addNote = async(title, description, tag) => {
        //to do api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();        
        // console.log(json);
        
        
        // console.log("Adding a new note");

        // const note = json;
        setNotes(notes.concat(note))
    }




    //Delete a note
    const deleteNote = async (id) => {
        // To do api call 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json);

        console.log("deleting a note with id " +id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);

    }





    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //to do api call

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
        console.log(json);
    

let newNotes = JSON.parse(JSON.stringify(notes))
    // and logic to edit in client

    for (let index = 0; index < newNotes.length; index++) {
        const elements = newNotes[index];

        if (elements._id === id) {
            elements.title = title;
            elements.description = description;
            elements.tag = tag;
            break;
        }
    }
    setNotes(newNotes);

}


return (
    // <NoteContext.Provider value={{state, update}}>
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
        {props.children}
    </NoteContext.Provider>
)
}
export default NoteState;
