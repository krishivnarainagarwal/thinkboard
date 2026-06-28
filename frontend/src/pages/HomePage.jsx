import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        console.log(response.data);
        setNotes(response.data);
       setRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Error fetching notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen"> 
      {isRateLimited && <RateLimitedUI />}
      <div className="mx-auto max-w-7xl p-4 mt-6">
      {loading && <div className=" text-center text-primary py-10">Loading notes...</div>}

     {!loading && !isRateLimited && notes.length === 0 && (
          <NotesNotFound />
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
              
            
          ))}
        </div>
      
    </div>
    </div>
  );
}

export default HomePage; 