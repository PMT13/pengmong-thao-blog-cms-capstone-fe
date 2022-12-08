import { IComment } from "../Interfaces/IComment";

export interface IAddBlogDTO{
  title: string,
  dateCreated: string,
  dateUpdated: string,
  body: string,
  creatorId: number,
  views: string[],
  comments: IComment[]
}
