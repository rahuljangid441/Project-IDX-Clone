export async function pingCheck( req , res) {
    try{
        return res.status(201).json({
            message:"Pong! api got hit",
            success:true,
        })
    }
    catch(err){
        console.log("error in pingCheck" , err);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}