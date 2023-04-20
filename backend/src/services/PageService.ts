import { Inject, Service } from 'typedi';
import PageEntity from '../entities/PageEntity';
import { PortfolioRepository } from '../repositories/PortfolioRepository';
import { PortfolioVersionRepository } from '../repositories/PortfolioVersionRepository';
import { PageRepository } from '../repositories/PageRepository';
import { IPageRepository } from '../repositories/interfaces/IPageRepository';
import { IPortfolioRepository } from '../repositories/interfaces/IPortfolioRepository';
import { IPortfolioVersionRepository } from '../repositories/interfaces/IPortfolioVersionRepository';
import { VersionType } from '../entities/PortfolioVersionEntity';

@Service()
export class PageService {
  constructor(
    @Inject(() => PortfolioRepository) private readonly portfolioRepository: IPortfolioRepository,
    @Inject(() => PortfolioVersionRepository) private readonly portfolioVersionRepository: IPortfolioVersionRepository,
    @Inject(() => PageRepository) private readonly pageRepository: IPageRepository
  ) {}

  async createPage(name: string, url: string, portfolioId: number): Promise<PageEntity> {
    const portfolio = await this.portfolioRepository.findOne(portfolioId);
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const existingPage = await this.pageRepository.findOne({ where: { name, url, portfolio } });

    if (existingPage) {
      throw new Error('Page already exists');
    }

    const draftVersion = await this.portfolioVersionRepository.findOne({
      where: { portfolio, versionType: VersionType.DRAFT },
    });

    const pagesOfDraftVersion = await this.pageRepository.find({ where: { portfolioVersion: draftVersion } });

    if (pagesOfDraftVersion.length >= 3) {
      throw new Error('Draft version already has 3 pages');
    }

    const newPage = this.pageRepository.create({
      name,
      url,
      portfolio,
      portfolioVersion: draftVersion,
    });

    await this.pageRepository.save(newPage);
    return newPage;
  }

  async getAllPagesForAPortfolioVersion(portfolioVersionId: number): Promise<PageEntity[]> {
    const portfolioVersion = await this.portfolioVersionRepository.findOne(portfolioVersionId);
    if (!portfolioVersion) {
      throw new Error('Portfolio not found');
    }

    const pages = await this.pageRepository.find({ where: { portfolioVersion }, relations: ['portfolioVersion'] });

    return pages;
  }
}
