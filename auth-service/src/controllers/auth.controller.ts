import { Request,Response,NextFunction } from "express";
import UserService from "../services/user.service";
import { validateRequiredFields } from "../helpers/utils";
import { User } from "../@types";
import TokenService from "../services/token.service";
import APIError from "../errors/APIError";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const requiredFields = ['id', 'email', 'password', 'name', 'lastname'];
    try {
        const validatedFields = validateRequiredFields<User>(req, requiredFields);
        const createdUser = await UserService.addUser(validatedFields);
        
        res.status(200).json({
            success: true,
            data: createdUser,
        });
    } catch (err) {
        next(err);
    }
}

export const signIn = async (req:Request,res:Response,next:NextFunction) => {
    try {
      const requiredFields = ['email', 'password']
    const { email, password } = validateRequiredFields<Pick<User, 'email' | 'password'>>(
        req,
        requiredFields,
      )
    const user = await UserService.getByEmail(email)
    
    if (user.password !== password)
        return next(new APIError(403,'INCORRECT_CREDENTIALS','WRONG PASSWORD') )
  
      // Delete password property in user object
      delete user.password
      
      const accessToken = TokenService.generateAccessToken(user)
      const refreshToken = TokenService.generateRefreshToken({id: user.id})

      res.status(200).json({
        success: true,
        data: user,
        accessToken,
        refreshToken
      })
    } catch (error) {
        return error
    }
      
}
export const refreshToken = async (req:Request,res:Response,next:NextFunction) => {
      try {
        const {refreshToken} = validateRequiredFields<{refreshToken:string}>(req,['refreshToken'])
        const verifiedRefreshToken = TokenService.verifygenerateRefreshToken(refreshToken)
        
        const user = await UserService.getUserById(verifiedRefreshToken.id)

        delete user.password // delete password info before generateAccessToken

        const accessToken = TokenService.generateAccessToken(user)
        
        res.status(200).json({
            success:true,
            accessToken,
        })
        
      } catch (err) {
        next(err)   
      }

}
