import Router from '@koa/router'
import { Context as KoaContext, DefaultState } from 'koa'

import get from 'lodash/get'

import { FileType } from 'Constants/files'

import { CommonError, UnauthorizedError } from 'Services/Errors'
import uploadFile from 'Services/Files/uploadFile'

const privateRouter = new Router<DefaultState, KoaContext>()

privateRouter.use('/', async (ctx, next) => {
  const user = get(ctx, 'user')
  if (!user) {
    throw new UnauthorizedError()
  } else {
    await next()
  }
})

/**
 * @api {get} /v1/private/checkAuth Check if user is authorized
 * @apiGroup Private
 *
 * @apiHeader Authorization Bearer access token
 *
 * @apiSuccess {Boolean} ok True if all goes fine
 */
privateRouter.get('/checkAuth', async ctx => {
  ctx.body = { ok: true }
})

const allowedFileTypes = Object.values(FileType)

/**
 * @api {post} /v1/private/uploadFile Upload file (multipart/form-data)
 * @apiGroup Private
 *
 * @apiHeader Authorization Bearer access token
 *
 * @apiParam {File} file File to upload
 * @apiParam {String} type File type
 * @apiParam {String} [entityId] Entity id
 *
 * @apiSuccess {Boolean} ok True if all goes fine
 * @apiSuccess {String} url File url
 */
privateRouter.post('/uploadFile', async ctx => {
  const userId = get(ctx, ['user', 'id'])
  const file = await get(ctx, ['request', 'files', 'file'])
  const type = ctx.request.body?.type
  const entityId = ctx.request.body?.entityId

  if (!allowedFileTypes.includes(type)) {
    throw new CommonError(`Type should be one of ${allowedFileTypes.join(',')}`)
  }

  const url = await uploadFile({
    file,
    type,
    userId,
    entityId,
  })

  ctx.body = { url, ok: true }
})

export default privateRouter
