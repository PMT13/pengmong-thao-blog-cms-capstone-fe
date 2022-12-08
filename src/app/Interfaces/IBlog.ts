import {IComment} from "./IComment";

export interface IBlog{
  id: number,
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
