/* eslint-disable no-return-await */
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { GENERIC_ERRORS } from 'Constants/errors'
import CVEntity from 'Entities/CV'
import { CommonError } from 'Services/Errors'
import { CreateCVArgs } from 'Schema/Admin/Args/CV'

import OkType from 'Schema/Types/Ok'

import { ACTIONS, RESOURCES } from 'Services/ACL'
import Context from 'Services/Context'

export default async function createCV(ctx: Context, args: CreateCVArgs) {
  //   await ctx.canAccess({
  //     resource: RESOURCES.ME,
  //     action: ACTIONS.CREATE,
  //   })
  
  await cryptoWaitReady()
  const keyring = new Keyring({ type: 'sr25519' })

  const root = keyring.addFromUri('//Alice')
  const cv = await CVEntity.createCV({ ...args, createdBy: ctx.user?.id });
  // console.log(cv.getDataValue('id'));
  // console.log(ctx.user?.id);
  const provider = new WsProvider('wss://smartcv.org/smartcv-node')
  console.log("Connect with blockchain");
  //   const provider = new WsProvider('ws://127.0.0.1:9944')
  const api = await ApiPromise.create({ provider })

  const events = new Promise(async (resolve, _) => {
    await api.tx.cv.createItem(cv.getDataValue('id'),ctx.user?.id,null)
    .signAndSend(root, ({ events, dispatchError }: any) => {

        if (dispatchError) {
            if (dispatchError.isModule) {
              // for module errors, we have the section indexed, lookup
              const decoded = api.registry.findMetaError(dispatchError.asModule);
              const { name, section } = decoded;
              const res = section.concat('.',name);
              //console.log(`${section}.${name}: ${docs.join(' ')}`);
              resolve(res)
            } else {
              // Other, CannotLookup, BadOrigin, no extra info
              //console.log(dispatchError.toString());
              resolve(dispatchError.toString())
            }
          }
        else {
            events.forEach(({event}: any) => {
                const {method, section} = event;
                //console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                if (section == 'cv'){
                    const res = 'Success'.concat(':',section,'.',method);
                    resolve(res)
                }

              });
        }
    });
})
  const res = await events as string;

  if (!res.includes('Success')) {
    throw new CommonError(GENERIC_ERRORS.TRANSACTION_FAIL)
  }

  return OkType.success
}
