import {IComment} from "./IComment";

export interface IBlog{
  id: number,
  title: string,
  dateCreated: string,
  dateUpdated: string,
  body: string,
  creatorId: number,
  views: string[],
  comments: IComment[]
}
