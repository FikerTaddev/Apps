// {}

import { 
    InvalidCredentialError , 
    MissingFieldError ,
    InvalidEmailFormatError,
    UserAlreadyExistsError
} from '../error/app.js';
import {authService} from '../service/authService.js';


export const SignUp = async (req, res,next) => {
    try {
        const {email , password} = req.body
        const token = await authService.RegisterUser(email, password)
        res.status(201).json({token})

    } catch (err){
       next(err)
    }
}

export const SignIn = async (req, res,next) => {
   
   try {
    const {email , password} = req.body
    const token = await authService.LoginUser(email, password)
    if(!token.ok){
        res.status(400).json({error:token.error})
    }
    res.status(200).json({token})
   } catch (err) {
   next(err)
   }
   
}