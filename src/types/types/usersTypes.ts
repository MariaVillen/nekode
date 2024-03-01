import { UpdateUserDto } from '../../users/dto/update-user.dto';

// Definimos un nuevo tipo que extiende UpdateUserDto con lastNotificationDate
export type ExtendedUpdateUserDto = UpdateUserDto & {
  lastNotificationDate?: Date;
};
