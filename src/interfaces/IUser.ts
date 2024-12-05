export interface UserQueryConditions {
  userId: string;
  username: string;
  email: string;
  password: string;
}

export type UserCredentials = Pick<UserQueryConditions, 'username' | 'password'>
