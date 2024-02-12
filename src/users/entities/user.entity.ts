import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../config/constants/roles';
import { IUser } from '../../types/user.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProgressStacksEntity } from './progressStacks.entity';
import { NOTIFICATIONFREQUENCY } from '../../config/constants/notification_frequency';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  tokenPass: string;
  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;
  @Column()
  life: number;
  @Column()
  totalPoints: number;
  @Column({ type: 'enum', enum: NOTIFICATIONFREQUENCY })
  challengeNotification: NOTIFICATIONFREQUENCY;
  @Column()
  notification: boolean;
  @OneToMany(() => ProgressStacksEntity, (progressStack) => progressStack.stack)
  stacks: ProgressStacksEntity[];
}
