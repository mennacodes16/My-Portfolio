export interface IProject {
  _id?: string;
  title: string;
  description: string;
  image: string;
  link: string;
}
export interface IProjectResponse {
  message: string;
  data: IProject[];
}