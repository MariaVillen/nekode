import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1707779101768 implements MigrationInterface {
    name = 'Init1707779101768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."themes_level_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "themes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "level" "public"."themes_level_enum" NOT NULL, "points" integer NOT NULL, "stack_id" uuid, CONSTRAINT "PK_ddbeaab913c18682e5c88155592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stacks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "points" integer NOT NULL, CONSTRAINT "UQ_75f04b9bdb2a366ff0e196ba97d" UNIQUE ("name"), CONSTRAINT "PK_04890620d6f2e3102d6756b1db0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "progress_themes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "progress_stack" integer NOT NULL, "theme_id" uuid, "stack_id" uuid, CONSTRAINT "PK_103d5d02c5397b312e994a8afbb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "progress_stacks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "progress" integer NOT NULL, "user_id" uuid, "stack_id" uuid, "themes_id" uuid, CONSTRAINT "PK_d82ad80b6c2b36ebd387e81e068" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('BASIC', 'ADMIN')`);
        await queryRunner.query(`CREATE TYPE "public"."users_challenge_notification_enum" AS ENUM('0', '1', '7')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "token_pass" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "life" integer NOT NULL, "total_points" integer NOT NULL, "challenge_notification" "public"."users_challenge_notification_enum" NOT NULL, "notification" boolean NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "themes" ADD CONSTRAINT "FK_f379e68c83634b3456ba355726b" FOREIGN KEY ("stack_id") REFERENCES "stacks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress_themes" ADD CONSTRAINT "FK_9ba94fc2d4180bd43ca600f8682" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress_themes" ADD CONSTRAINT "FK_17172befe2ace88d138588b7906" FOREIGN KEY ("stack_id") REFERENCES "progress_stacks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress_stacks" ADD CONSTRAINT "FK_f38c1cf40148dfbdd2bd5a81564" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress_stacks" ADD CONSTRAINT "FK_7e63804e2621eeb0f5f24523054" FOREIGN KEY ("stack_id") REFERENCES "stacks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress_stacks" ADD CONSTRAINT "FK_4456ddb0ce427c01f75731e545f" FOREIGN KEY ("themes_id") REFERENCES "progress_themes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "progress_stacks" DROP CONSTRAINT "FK_4456ddb0ce427c01f75731e545f"`);
        await queryRunner.query(`ALTER TABLE "progress_stacks" DROP CONSTRAINT "FK_7e63804e2621eeb0f5f24523054"`);
        await queryRunner.query(`ALTER TABLE "progress_stacks" DROP CONSTRAINT "FK_f38c1cf40148dfbdd2bd5a81564"`);
        await queryRunner.query(`ALTER TABLE "progress_themes" DROP CONSTRAINT "FK_17172befe2ace88d138588b7906"`);
        await queryRunner.query(`ALTER TABLE "progress_themes" DROP CONSTRAINT "FK_9ba94fc2d4180bd43ca600f8682"`);
        await queryRunner.query(`ALTER TABLE "themes" DROP CONSTRAINT "FK_f379e68c83634b3456ba355726b"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_challenge_notification_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "progress_stacks"`);
        await queryRunner.query(`DROP TABLE "progress_themes"`);
        await queryRunner.query(`DROP TABLE "stacks"`);
        await queryRunner.query(`DROP TABLE "themes"`);
        await queryRunner.query(`DROP TYPE "public"."themes_level_enum"`);
    }

}
