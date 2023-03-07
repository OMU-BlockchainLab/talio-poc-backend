import { NotificationKind } from 'Constants/enums'
import { PubSubTopics } from 'Constants/pubSub'

import { Contact } from 'Models'

import PubSub from 'Services/PubSub'

export default async function sendContactCreated(contact: Contact) {
  await PubSub.publish(PubSubTopics.Notification, {
    kind: NotificationKind.contactCreated,
    payload: {
      userId: contact.userId,
      contactId: contact.id,
    },
  })
}
