import { IMessage } from "../Interfaces/IMessage";

export interface IAddChatDTO{
  person1: string,
  person2: string,
  messages: IMessage[],
  lastVisitedPerson1: string,
  lastVisitedPerson2: string
}