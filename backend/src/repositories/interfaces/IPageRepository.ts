import PageEntity from '../../entities/PageEntity';

export interface IPageRepository {
  find(options: any): Promise<PageEntity[]>;
  findOne(options: any): Promise<PageEntity | undefined>;
  create(page: Partial<PageEntity>): PageEntity;
  save(page: PageEntity): Promise<PageEntity>;
}
