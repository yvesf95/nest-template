import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { BaseEntity } from '../entities';

export abstract class BaseRepository<T extends BaseEntity> extends EntityRepository<T> {
  persist(entity: T | T[]): EntityManager {
    return this.em.persist(entity);
  }

  async persistAndFlush(entity: T | T[]): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

  remove(entity: T): EntityManager {
    return this.em.remove(entity);
  }

  async removeAndFlush(entity: T): Promise<void> {
    await this.em.removeAndFlush(entity);
  }

  async flush(): Promise<void> {
    return this.em.flush();
  }
}
