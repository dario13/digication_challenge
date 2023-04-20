import { getRepository } from 'typeorm';
import PageEntity from '../entities/PageEntity';
import { IPageRepository } from './interfaces/IPageRepository';
import { Service } from 'typedi';

@Service()
export class PageRepository implements IPageRepository {
  private readonly pageRepository = getRepository(PageEntity);

  async find(options: any): Promise<PageEntity[]> {
    return await this.pageRepository.find(options);
  }

  async findOne(options: any): Promise<PageEntity | undefined> {
    return await this.pageRepository.findOne(options);
  }

  create(page: Partial<PageEntity>): PageEntity {
    return this.pageRepository.create(page);
  }

  async save(page: PageEntity): Promise<PageEntity> {
    return await this.pageRepository.save(page);
  }
}
