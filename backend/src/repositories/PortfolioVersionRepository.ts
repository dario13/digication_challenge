import { getRepository } from 'typeorm';
import PortfolioVersionEntity from '../entities/PortfolioVersionEntity';
import { IPortfolioVersionRepository } from './interfaces/IPortfolioVersionRepository';
import { Service } from 'typedi';
import PortfolioEntity from '../entities/PortfolioEntity';

@Service()
export class PortfolioVersionRepository implements IPortfolioVersionRepository {
  private readonly portfolioVersionRepository = getRepository(PortfolioVersionEntity);

  async findOne(options: any): Promise<PortfolioVersionEntity | undefined> {
    return await this.portfolioVersionRepository.findOne(options);
  }

  create(params: Partial<PortfolioVersionEntity>): PortfolioVersionEntity {
    return this.portfolioVersionRepository.create(params);
  }

  async save(portfolioVersion: PortfolioVersionEntity): Promise<PortfolioVersionEntity> {
    return await this.portfolioVersionRepository.save(portfolioVersion);
  }

  async findAll(portfolio: PortfolioEntity): Promise<PortfolioVersionEntity[]> {
    return await this.portfolioVersionRepository.find({ where: { portfolio } });
  }
}
