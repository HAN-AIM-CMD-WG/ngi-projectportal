import { Status } from './status';

export type User = {
  uuid: string;
  name: string;
  email: string;
  status: Status[];
  pictureUrl: string;
};
