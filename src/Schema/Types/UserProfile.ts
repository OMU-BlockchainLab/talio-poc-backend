import { Field, ID, ObjectType, Root } from 'type-graphql'

import { FileType } from 'Constants/files'

import UserProfile from 'Models/UserProfile'

import Files from 'Services/Files'

import ImageType from './Image'

@ObjectType('UserProfile')
export default class UserProfileType extends UserProfile {
  @Field(() => ImageType, {
    nullable: true,
    description: Files.getGraphQLAvailableSizes(FileType.profilePhoto),
  })
  public avatar(@Root() root: UserProfile) {
    return (
      root.photoUrl && Files.getSizePaths(root.photoUrl, FileType.profilePhoto)
    )
  }

  @Field(() => ImageType, {
    nullable: true,
    description: Files.getGraphQLAvailableSizes(FileType.profileBackground),
  })
  public background(@Root() root: UserProfile) {
    return (
      root.backgroundUrl &&
      Files.getSizePaths(root.backgroundUrl, FileType.profileBackground)
    )
  }
}

@ObjectType('UserId')
export class UserIdType {
  @Field(() => ID)
  public userId: string
}
