import { BaseEntity } from '@/common/entities';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ collection: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true })
  email: string;

  @Property()
  password: string;
}
