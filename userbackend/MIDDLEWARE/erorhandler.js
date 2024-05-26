const erorhandler = (req,res)=>{
    return res.status(500).json({msg:"something went wrong please try again"})
}


module.exports = erorhandler