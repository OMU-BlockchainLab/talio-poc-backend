export enum FileType {
  profilePhoto = 'profilePhoto',
  profileBackground = 'profileBackground',
  channelBackground = 'channelBackground',
}

export enum Size {
  xsmall = 'xsmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge = 'xlarge',
}

export const IMAGE_SIZES = {
  [FileType.profilePhoto]: {
    [Size.small]: 128,
    [Size.medium]: 512,
  },
  [FileType.profileBackground]: {
    [Size.large]: 1024,
  },
  [FileType.channelBackground]: {
    [Size.large]: 1024,
  },
}

export enum AttachmentType {
  voiceMessage = 'voiceMessage',
  image = 'image',
  video = 'video',
}

export const AVAILABLE_ATTACHMENT_MIMES = {
  [AttachmentType.voiceMessage]: ['audio/mpeg', 'audio/mp3', 'audio/x-aac'],
  [AttachmentType.image]: ['image/jpg', 'image/jpeg', 'image/png'],
  [AttachmentType.video]: [
    'video/mp4',
    'video/webm',
    'video/mpeg',
    'video/quicktime',
  ],
}
