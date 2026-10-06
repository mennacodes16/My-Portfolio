
export interface IMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}
export interface IMessageResponse {
  message: string;
  data: IMessage[];
}
