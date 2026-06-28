import { PenSquare, Trash2 } from "lucide-react";
// Note: On the web, this usually needs to be 'react-router-dom'
import { Link } from "react-router"; 
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
    const handleDelete= async (e, id) => {
            e.preventDefault();

            if(!window.confirm("Are you sure that you want to delete your note???")){
                return;
            };
            try{
                await api.delete(`/notes/${id}`)
                setNotes((prev) => prev.filter((n) => n._id !== id))
                toast.success("Note Deleted Successfully");
            } catch(error){
                 console.log("Error in handleDelete", error);
                toast.error("Note Deletion Failed");
            }
        };
    // Safety check: If note is somehow undefined, don't crash
    if (!note) return null;
    
    return (
        <Link 
            to={`/note/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {new Date(note.createdAt).toLocaleString()}
                    </span>
                    
                    {/* Reorganized the layout so buttons aren't trapped inside the badge */}
                    <div className="flex items-center gap-2">
                        <div className="badge badge-outline">{note.category}</div>
                        
                        <div className="flex items-center gap-1">
                            <button className="btn btn-ghost btn-xs text-info">
                                {/* Corrected icon names here */}
                                <PenSquare className="size-4" /> 
                            </button>
                            <button className="btn btn-ghost btn-xs text-error" onClick= {(e) => handleDelete(e, note._id)}>
                                {/* Corrected icon names here */}
                                <Trash2 className="size-4" /> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default NoteCard;