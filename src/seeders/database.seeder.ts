import { User } from '@/modules/users/user.entity';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // Create something here...
    em.create(User, {
      email: 'test@me.com',
      password: 'test',
      createdDate: new Date(),
      version: 1,
    });
    console.log('database seeder ran');
  }
}
