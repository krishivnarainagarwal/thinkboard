import express from 'express'; 
import notesRoutes from './routes/notesRoutes.js'; 
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';

dotenv.config(); 

console.log(process.env.MongoDB_URI); // Log the MongoDB URI to verify it's being read correctly
const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

app.use(express.json());

app.use("/api/notes", notesRoutes); 

app.listen(PORT, () => {
    console.log('Server started on PORT:', PORT);
});