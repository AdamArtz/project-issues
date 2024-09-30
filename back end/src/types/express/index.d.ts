import { User } from '../../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
interface JwtPayload {
    id: string;
    email: string;
    isAdmin: boolean;
  }