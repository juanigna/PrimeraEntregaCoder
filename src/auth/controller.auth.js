import { User } from '../dao/models/User.model.js';

export const loginLogic = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({email});
    
        console.log("el user es: ", user)
    
        if(!user || user.password !== password) {
          return res.json({error: "El usuario y la contraseña no coinciden"})
        }
    
       req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
       }
    
       console.log(req.session.user)
        
      
      
       return res.status(200).json({success:"Se logueo correctamente"})
    
    
      
        }
     catch(error) {
        console.error("Se ha producido un error: " + error.message);
     }
}