// Types and Interfaces

import {Types} from "mongoose";
interface Post {
  _id: Types.ObjectId;
  createdAt: Date;
  title: string;
  content: string;
  user: string;
}
