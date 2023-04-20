import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import PageEntity from '../entities/PageEntity';
import { PageService } from '../services/PageService';

@Resolver(() => PageEntity)
@Service()
export class PageResolver {
  constructor(private readonly pageService: PageService) {}

  @Mutation(() => PageEntity)
  async createPage(
    @Arg('name') name: string,
    @Arg('url') url: string,
    @Arg('portfolioId') portfolioId: number
  ): Promise<PageEntity> {
    return await this.pageService.createPage(name, url, portfolioId);
  }

  @Query(() => [PageEntity], { description: 'get all portfolio pages for a given a portfolio version' })
  async getAllPagesForAPortfolioVersion(@Arg('portfolioVersionId') portfolioVersionId: number): Promise<PageEntity[]> {
    return await this.pageService.getAllPagesForAPortfolioVersion(portfolioVersionId);
  }
}
