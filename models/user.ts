import { Post } from "./post";

export interface User {
  displayName: string;

  photoURL: string;
  username: string;
  posts?:Post[]
}
