import PortfolioEntity from '../../entities/PortfolioEntity';
import PortfolioVersionEntity from '../../entities/PortfolioVersionEntity';

export interface IPortfolioVersionRepository {
  findOne(options: any): Promise<PortfolioVersionEntity | undefined>;
  create(params: Partial<PortfolioVersionEntity>): PortfolioVersionEntity;
  save(portfolioVersion: PortfolioVersionEntity): Promise<PortfolioVersionEntity>;
  findAll(portfolio: PortfolioEntity): Promise<PortfolioVersionEntity[]>;
}
