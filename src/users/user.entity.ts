import { BaseEntity } from '@/common/entities';

export class User extends BaseEntity {
  email: string;
  password: string;
}
