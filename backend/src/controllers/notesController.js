import Note from "../../model/Note.js";
export async function getAllNotes(req, res) {
    try{
const notes= await Note.find().sort({createdAt: -1});
res.status(200).json(notes);
  }catch(error){
    console.error("Error in getAllNotes controller:", error);
    res.status(500).json({message: "internal server error"});
} 
}

export async function getNoteById(req, res) {
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: "Note not found"});
        res.status(200).json(note);
    }catch(error){
        console.error("Error in getNoteById controller:", error);
        res.status(500).json({message: "internal server error"});
    }
}

export async function createNote(req, res) {
    try {
        // 1. Grab the data from Postman
        const { title, content } = req.body;
        
        // 2. Create the brand new note
        const note = new Note({ title, content });

        // 3. Save it to the database
        const savedNote = await note.save();
        
        // 4. Send back the success response
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller:", error);
        res.status(500).json({ message: "internal server error" });
    }
}


export async function updateNote(req, res) {
    try{
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        if(!updatedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(updatedNote);
        
    } catch(error){
        console.error("Error in updateNote controller:", error);
        res.status(500).json({message: "internal server error"});
    }
}
export async function deleteNote(req, res) {
try{
        const {title, content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(deletedNote);
        
    } catch(error){
        console.error("Error in deleteNote controller:", error);
        res.status(500).json({message: "internal server error"});
    }}