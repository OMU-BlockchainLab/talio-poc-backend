import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import {
  CertsArgs,
  CreateCertArgs,
  UpdateCertArgs,
} from 'Schema/Admin/Args/Cert'

import CertType from 'Schema/Types/Cert'
import CertList from 'Schema/Types/CertList'
import OkType from 'Schema/Types/Ok'

import Context from 'Services/Context'

import mutations from './Mutations'
import queries from './Queries'

@Resolver(() => CertType)
export default class CertsResolver {
  @Query(() => CertList)
  public async Certs(@Ctx() ctx: Context, @Args() args: CertsArgs) {
    return queries.Certs(ctx, args)
  }

  @Mutation(() => CertType)
  public async createCert(@Ctx() ctx: Context, @Args() args: CreateCertArgs) {
    return mutations.create(ctx, args)
  }

  @Mutation(() => OkType)
  public async updateCert(@Ctx() ctx: Context, @Args() args: UpdateCertArgs) {
    return mutations.update(ctx, args)
  }
}
