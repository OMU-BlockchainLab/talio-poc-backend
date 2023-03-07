import deleteFromS3 from './deleteFromS3'
import {
  generateImages,
  getAvailableSizes,
  getGraphQLAvailableSizes,
  getSizePaths,
} from './imagesForType'
import resizeImage from './resizeImage'
import { getSignedUrl, putSignedUrl } from './signS3'
import uploadFile from './uploadFile'
import { generateFileName, uploadToS3 } from './uploadToS3'

export default {
  deleteFromS3,
  generateFileName,
  generateImages,
  getAvailableSizes,
  getGraphQLAvailableSizes,
  getSignedUrl,
  getSizePaths,
  putSignedUrl,
  resizeImage,
  uploadFile,
  uploadToS3,
}
