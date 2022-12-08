import { IMessage } from "./IMessage";

export interface IChat{
  id: number,
  person1: string,
  person2: string,
  messages: IMessage[],
  lastVisitedPerson1: string,
  lastVisitedPerson2: string
}
