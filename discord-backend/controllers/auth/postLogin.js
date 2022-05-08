const User= require('../../models/user');
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const postLogin=async (req,res)=>{
    try{
        const{ username,password }=req.body;
        //check if user exists
        console.log(username)
        const userExists=await User.findOne({username:username});
        console.log(userExists)
        if(userExists){
            if(await bcrypt.compare(password,userExists.password))
            {
                const token= jwt.sign(
                    {
                        userId: userExists._id,
                    },
                    process.env.TOKEN_KEY,{
                        expiresIn:"24h",
                    }
                );
                return res.status(200).json({
                    userDetails:{
                        mail: userExists.mail,
                    token: token,
                username:userExists.username,
                    }
            });
        }
         res.status(409).send("Password is wrong");
    }}
    catch(err){
        console.log(err)
         res.status(500).send("Error occured. Please try again");
    }
};

module.exports =postLogin;
