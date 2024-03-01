import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { NOTIFICATIONFREQUENCY } from '../../config/constants/notification_frequency';
import { ROLES } from '../../config/constants/roles';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  tokenPass: string;

  @IsEnum(ROLES)
  role: ROLES;

  @IsInt()
  life: number;

  @IsString()
  avatar: string;

  @IsInt()
  totalPoints: number;

  @IsEnum(NOTIFICATIONFREQUENCY)
  challengeNotification: NOTIFICATIONFREQUENCY;

  @IsDate()
  lastNotificationDate: Date;

  @IsBoolean()
  notification: boolean;
}
