//gateway\src\services\token.service.ts
import jwt from 'jsonwebtoken'
import { SafeUser } from '../@types'



const accessTokenSecret =  'shhhitsscreetcode';
const refreshTokenSecret =  accessTokenSecret + 'refresh';
const expires_In =  '1m';


const generateAccessToken = (_payload: SafeUser) => {
  return jwt.sign(_payload, accessTokenSecret, {expiresIn: expires_In });
};
const verifygenerateAccessToken = (token:string)=>jwt.verify(token,accessTokenSecret) as SafeUser

const generateRefreshToken = (_payload: Pick<SafeUser,'id'>) => {
  return jwt.sign(_payload, refreshTokenSecret);
};
const verifygenerateRefreshToken  = (token:string)=>jwt.verify(token,refreshTokenSecret) as Pick<SafeUser,'id'>

const TokenService = {
    generateAccessToken,
    generateRefreshToken,
    verifygenerateAccessToken,
    verifygenerateRefreshToken,
}
export default TokenService