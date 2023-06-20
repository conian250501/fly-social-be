import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1687072335222 implements MigrationInterface {
  name = "InitialDatabase1687072335222";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."users_type_auth_enum" AS ENUM('local', 'google', 'facebook', 'github');
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "avatar" character varying,
                "cover" character varying,
                "bio" character varying,
                "email" character varying,
                "name" character varying,
                "nickname" character varying,
                "phone" character varying,
                "address" character varying,
                "website" character varying,
                "birth_date" character varying,
                "password" character varying,
                "type_auth" "public"."users_type_auth_enum" NOT NULL DEFAULT 'local',
                "google_id" character varying,
                "facebook_id" character varying,
                "github_id" character varying,
                "role" character varying NOT NULL DEFAULT 'user',
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "users";
            DROP TYPE "public"."users_type_auth_enum"
        `);
  }
}
