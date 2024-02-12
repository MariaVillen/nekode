import { BaseEntity } from '../../config/base.entity';
import { StacksEntity } from '../../stacks/entities/stack.entity';
import { ITheme } from '../../types/theme.interface';
import { LEVELS } from '../../config/constants/levels';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'themes' })
export class ThemesEntity extends BaseEntity implements ITheme {
  @Column()
  name: string;
  @Column({ type: 'enum', enum: LEVELS })
  level: LEVELS;
  @Column()
  points: number;
  @ManyToOne(() => StacksEntity, (stack) => stack.themes)
  stack: string;
}
