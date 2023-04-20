import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import PortfolioVersionEntity from '../entities/PortfolioVersionEntity';
import { Service } from 'typedi';
import { PortfolioVersionService } from '../services/PortfolioVersionService';

@Resolver(() => PortfolioVersionEntity)
@Service()
export class PortfolioVersionResolver {
  constructor(private readonly portfolioVersionService: PortfolioVersionService) {}

  @Query(() => [PortfolioVersionEntity])
  async portfolioVersions(@Arg('portfolioId') portfolioId: number): Promise<PortfolioVersionEntity[]> {
    return await this.portfolioVersionService.portfolioVersions(portfolioId);
  }

  @Mutation(() => PortfolioVersionEntity)
  async createSnapshotPortfolioVersion(@Arg('portfolioId') portfolioId: number): Promise<PortfolioVersionEntity> {
    return await this.portfolioVersionService.createSnapshotPortfolioVersion(portfolioId);
  }

  @Mutation(() => PortfolioVersionEntity, { description: 'Create a snapshot from a draft version' })
  async createSnapshotFromDraft(
    @Arg('portfolioId') portfolioId: number,
    @Arg('pagesId', () => [Number]) pagesId: number[]
  ): Promise<PortfolioVersionEntity> {
    return await this.portfolioVersionService.createSnapshotFromDraft(portfolioId, pagesId);
  }
}
