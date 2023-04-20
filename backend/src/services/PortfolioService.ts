import { Inject, Service } from 'typedi';
import PortfolioEntity from '../entities/PortfolioEntity';
import { IPortfolioRepository } from '../repositories/interfaces/IPortfolioRepository';
import { VersionType } from '../entities/PortfolioVersionEntity';
import { IPortfolioVersionRepository } from '../repositories/interfaces/IPortfolioVersionRepository';
import { PortfolioRepository } from '../repositories/PortfolioRepository';
import { PortfolioVersionRepository } from '../repositories/PortfolioVersionRepository';

@Service()
export class PortfolioService {
  constructor(
    @Inject(() => PortfolioRepository) private readonly portfolioRepository: IPortfolioRepository,
    @Inject(() => PortfolioVersionRepository) private readonly portfolioVersionRepository: IPortfolioVersionRepository
  ) {}

  async createPortfolio(name: string, url: string): Promise<PortfolioEntity> {
    const existingPortfolio = await this.portfolioRepository.findOne({ name, url });

    if (existingPortfolio) {
      throw new Error('Portfolio already exists');
    }

    const newPortfolio = this.portfolioRepository.create({ name, url, pages: [] });
    const savedPortfolio = await this.portfolioRepository.save(newPortfolio);

    const newPortfolioVersion = this.portfolioVersionRepository.create({
      portfolio: savedPortfolio,
      versionType: VersionType.DRAFT,
      pages: [],
    });

    await this.portfolioVersionRepository.save(newPortfolioVersion);

    return savedPortfolio;
  }

  async listPortfolios(): Promise<PortfolioEntity[]> {
    return await this.portfolioRepository.createQueryBuilder();
  }
}
