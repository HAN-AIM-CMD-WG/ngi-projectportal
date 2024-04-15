import { Status } from './status';

export type User = {
  id: string;
  name: string;
  email: string;
  status: Status[];
  pictureUrl: string;
};
