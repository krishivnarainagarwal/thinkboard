import ratelimit from "../config/upstash.js";


const rateLimiter= async (req, res, next) => {

  try{
   const {success} = await ratelimit.limit("my-rate-limit");
    if(!success){
        return res.status(429).json({
             message: "Too Many Requests, try again later" 

        });
    }
    next();
  }catch(error){
    console.log("Error occurred while limiting requests:", error);
    next(error);
  }
};

export default rateLimiter;