// {}

import {RegisterUser , LoginUser} from '../service/authService.js';


export const SignUp = async (req, res) => {
    try {
        const {email , password} = req.body
        const token = await RegisterUser(email, password)

        if (!token.ok){
            res.status(400).json({erro:token.error})
        }
        res.status(201).json({token})

    } catch (err){
        console.log(err)
    }
}

export const SignIn = async (req, res) => {
   
   try {
    const {email , password} = req.body
    const token = await LoginUser(email, password)
    if(!token.ok){
        res.status(400).json({error:token.error})
    }
    res.status(200).json({token})
   } catch (err) {
    console.log(err)
   }
   
}