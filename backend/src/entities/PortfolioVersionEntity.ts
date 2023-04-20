import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import PageEntity from './PageEntity';
import PortfolioEntity from './PortfolioEntity';

export enum VersionType {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  SNAPSHOT = 'SNAPSHOT',
}

@ObjectType('PortfolioVersion')
@Entity()
export default class PortfolioVersionEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'enum',
    enum: VersionType,
    default: VersionType.DRAFT,
  })
  versionType: VersionType;

  @ManyToOne(() => PortfolioEntity)
  portfolio: PortfolioEntity;

  @OneToMany(() => PageEntity, (page) => page.portfolioVersion)
  pages: PageEntity[];
}
