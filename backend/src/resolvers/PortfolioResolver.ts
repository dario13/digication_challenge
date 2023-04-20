import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import PortfolioEntity from '../entities/PortfolioEntity';
import { PortfolioService } from '../services/PortfolioService';

@Resolver(() => PortfolioEntity)
@Service()
export class PortfolioResolver {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Mutation(() => PortfolioEntity)
  async createPortfolio(@Arg('name') name: string, @Arg('url') url: string): Promise<PortfolioEntity> {
    return await this.portfolioService.createPortfolio(name, url);
  }

  @Query(() => [PortfolioEntity], { description: 'List all portfolios' })
  async listPortfolios(): Promise<PortfolioEntity[]> {
    return await this.portfolioService.listPortfolios();
  }
}
