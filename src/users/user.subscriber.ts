import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';
/**
 * NOTE: Event subscribers cannot be request-scoped
 */

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(private dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    return User;
  }
  beforeInsert(event: InsertEvent<User>) {
    console.log(`BEFORE USER INSERTED EVENT: `, event.entity);
  }
}
