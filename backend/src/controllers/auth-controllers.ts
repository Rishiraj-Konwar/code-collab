import type {Request, Response} from 'express';
import { UserService } from '../services';
export async function signUp(req: Request, res: Response){
  const {username, email, password} = req.body;
  try {
    const user = await UserService.createUser({
      username: username,
      email: email,
      password: password
    })
  }catch(err: any){
    
  }
}