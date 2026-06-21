import express from 'express'; 
import notesRoutes from './routes/notesRoutes.js'; 

const app = express();

app.use("/api/notes", notesRoutes); 

// If this block is missing, the server won't open the port!
app.listen(5001, () => {
    console.log('Server started on port 5001');
});