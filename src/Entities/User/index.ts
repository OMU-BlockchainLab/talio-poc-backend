import changeSettings from './changeSettings'
import completeOnboardingStep from './completeOnboardingStep'
import createUserByEmail from './createUserByEmail'
import createUserByLogin from './createUserByLogin'
import deactivate from './deactivate'
import deleteManyUsers from './deleteManyUsers'
import deleteUser from './deleteUser'
import getUserById from './getUserById'
import getUserList from './getUserList'
import reactivate from './reactivate'
import update from './update'

export default {
  changeSettings,
  completeOnboardingStep,
  createUserByEmail,
  createUserByLogin,
  deactivate,
  delete: deleteUser,
  deleteManyUsers,
  getUserList,
  reactivate,
  update,
  getUserById,
}
