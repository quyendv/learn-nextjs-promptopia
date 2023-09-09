export interface IPost {
  prompt: string;
  tag: string;
}

export interface ICreatePost extends IPost {
  userId?: string;
}
