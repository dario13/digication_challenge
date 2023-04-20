import { getRepository } from 'typeorm';
import PortfolioEntity from '../entities/PortfolioEntity';
import { IPortfolioRepository } from './interfaces/IPortfolioRepository';
import { Service } from 'typedi';

@Service()
export class PortfolioRepository implements IPortfolioRepository {
  private readonly portfolioRepository = getRepository(PortfolioEntity);

  async findOne(options: any): Promise<PortfolioEntity | undefined> {
    return await this.portfolioRepository.findOne(options);
  }

  create(portfolio: Partial<PortfolioEntity>): PortfolioEntity {
    return this.portfolioRepository.create(portfolio);
  }

  async save(portfolio: PortfolioEntity): Promise<PortfolioEntity> {
    return await this.portfolioRepository.save(portfolio);
  }

  async createQueryBuilder(): Promise<any> {
    return await this.portfolioRepository.createQueryBuilder('p').getMany();
  }
}
