import { User } from "../user/User";

export type Superhero = {
  id: number;
  alias: string;
  realName: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  originStory: string;
  user: User;
};
