import { Field, ObjectType } from 'type-graphql'

import get from 'lodash/get'

import { Size } from 'Constants/files'

@ObjectType('ImageSize')
export class ImageSizeType {
  @Field()
  public url(): string {
    return get(this, 'path')
  }
}

@ObjectType('Image')
export default class ImageType {
  @Field()
  public url(): string {
    return get(this, 'initial')
  }

  @Field(() => ImageSizeType, { nullable: true })
  public xsmall?(): ImageSizeType {
    return get(this, ['sizes', Size.xsmall]) || null
  }

  @Field(() => ImageSizeType, { nullable: true })
  public small?(): ImageSizeType {
    return get(this, ['sizes', Size.small]) || null
  }

  @Field(() => ImageSizeType, { nullable: true })
  public medium?(): ImageSizeType {
    return get(this, ['sizes', Size.medium]) || null
  }

  @Field(() => ImageSizeType, { nullable: true })
  public large?(): ImageSizeType {
    return get(this, ['sizes', Size.large]) || null
  }

  @Field(() => ImageSizeType, { nullable: true })
  public xlarge?(): ImageSizeType {
    return get(this, ['sizes', Size.xlarge]) || null
  }
}
