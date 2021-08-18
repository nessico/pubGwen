import { IUser } from './user';

export class UserParams {
  gender!: string;
  minAge = 18;
  maxAge = 100;
  pageIndex = 1;
  pageSize = 6;
  orderBy = 'lastActive';

  constructor(user: IUser) {
    this.gender = user.gender === 'female' ? 'male' : 'female';
  }
}
