// Types and Interfaces

import {Types} from "mongoose";
interface Post {
  updatedAt: Date;
  _id: Types.ObjectId;
  createdAt: Date;
  title: string;
  content: string;
  user: string;
}
