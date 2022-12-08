import { IComment } from "../Interfaces/IComment";

export interface IAddBlogDTO{
  title: string,
  dateCreated: string,
  dateUpdated: string,
  body: string,
  creatorId: number,
  backgroundColor: string,
  fontColor: string,
  fontStyle: string,
  fontSize: number,
  imageURL: string,
  views: string[],
  comments: IComment[]
}
