const express = require("express");

const router = express.Router();

var fetchUser = require('../middlewares/fetchUser')

const { body, validationResult } = require('express-validator');

const Note = require('../models/Note');




//ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes", login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

})

//ROUTE 2: Add a new note using: POST "/api/notes/addnote", login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})



//ROUTE 3: Update an existing Note using : PUT "/api/auth/updatenote", login required
router.put('/updatenote/:id', fetchUser, async(req,res)=>{

    try {
        const{title, description, tag}= req.body;
        //vreate a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("not found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed");
    }
    
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json(note);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
}
})


//ROUTE 4: Delete an existing Note using : DELETE "/api/auth/deletenote", login required
router.delete('/deletenote/:id', fetchUser, async(req,res)=>{

    try {
        //find the note to be updated and delete it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("not found");
        }
        
        //allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("not allowed");
        }
        
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success" :"Note has been deleted", note: note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

module.exports = router