import { Request,Response, NextFunction } from "express";
import jwt,{JwtPayload} from 'jsonwebtoken';
interface AuthenticatedRequest extends Request {
    user?: string;
  }

  interface CustomJwtPayload extends JwtPayload {
    id: string;
    name: string;
  }     

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // Extract token from headers
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
         res.status(401).json({ success: false, message: "Access denied. No token provided" });
         return 
      }
      
      const token:string = authHeader.split(" ")[1];
  
      // Verify token
      try{
        const decoded = jwt.verify(token,'my secret key ')  as CustomJwtPayload;
      req.user = decoded.id;
        //   console.log(decoded)
      next();

      }
      catch(err){
        res.status(401).json({ success: false, message: "Invalid or expired token" ,error:err})
      }
      
    } catch (error) {
       res.status(401).json({ success: false, message: "error while authentication token" });
       return
    }
  };


