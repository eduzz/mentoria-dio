export default interface IUserToken {
  id: number;
  email: string;
  name: string;
  roles: string[];
  exp: number;
}
