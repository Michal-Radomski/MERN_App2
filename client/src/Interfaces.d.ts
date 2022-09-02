// Types and Interfaces

import {Types} from "mongoose";
interface Post {
  slug: string;
  updatedAt: Date | undefined;
  _id: Types.ObjectId;
  createdAt: Date | undefined;
  title: string;
  content: string;
  user: string;
}
