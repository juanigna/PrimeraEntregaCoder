import { User } from '../dao/models/User.model.js';

export const userPost = async (req, res) => {
    try{
        let newUserInfo = {};
        const {first_name, last_name, age, email, password} = req.body; 
        if(email == "adminCoder@coder.com" && password == "adminCod3r123") {
            newUserInfo = {
                 first_name,
                  last_name,
                   age, 
                   email, 
                   password ,
                   role: "admin"
             }
         }
         newUserInfo = {
            first_name,
            last_name,
            age,
            email,
            password,
            role: "usuario"
        }

        const newUser = await User.create(newUserInfo);
        res.status(200).json({message: 'New user added successfully'})

    }catch(e){
        if(e.code === 11000) return res.status(400).json({message: 'The user already exists!'})
        return res.status(500).json({message: 'Internal Server Error'});
    }
} 