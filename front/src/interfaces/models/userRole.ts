import { enRoles } from './user';

export default interface IUserRole {
  role: enRoles;
  name: string;
  description?: string;
}
