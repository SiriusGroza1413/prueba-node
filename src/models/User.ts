import { Schema, model, Document } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
}
  
const userSchema = new Schema<IUser & Document>({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true },
});
  

const UserModel = model<IUser & Document>('User', userSchema);

export default UserModel