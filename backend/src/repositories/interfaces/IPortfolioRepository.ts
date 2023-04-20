import PortfolioEntity from '../../entities/PortfolioEntity';

export interface IPortfolioRepository {
  findOne(options: any): Promise<PortfolioEntity | undefined>;
  create(portfolio: Partial<PortfolioEntity>): PortfolioEntity;
  save(portfolio: PortfolioEntity): Promise<PortfolioEntity>;
  createQueryBuilder(): any;
}
