import { User, Wallet } from 'Models'

interface WalletsParams {
  userId: string
}
export default async function wallets({ userId }: WalletsParams) {
  return Wallet.findAll({
    where: { userId },
    include: [{ model: User, as: 'user', required: true }],
  })
}
