import express from 'express'; 
import cors from 'cors'; // Import the CORS middleware
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js'; 
import {connectDB} from './config/db.js';
import rateLimiter from  './middleware/rateLimiter.js';

dotenv.config(); 

console.log(process.env.MongoDB_URI); // Log the MongoDB URI to verify it's being read correctly
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(rateLimiter);


// Enable CORS for all routes
 // Apply the rate limiter middleware to all routes
// simple custom middleware to log request method and URL
// app.use((req, res, next) => {
//     console.log(`Request Method: ${req.method} & Request URL: ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes); 

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server started on PORT:', PORT);
});
});