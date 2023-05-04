import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1683095328713 implements MigrationInterface {
    name = 'UpdateUsers1683095328713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "type";
            CREATE TYPE "public"."users_type_auth_enum" AS ENUM('local', 'google', 'facebook', 'github');
            ALTER TABLE "users"
            ADD "type_auth" "public"."users_type_auth_enum" NOT NULL DEFAULT 'local';
            ALTER TABLE "users"
            ADD "google_id" character varying;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "google_id";
            ALTER TABLE "users" DROP COLUMN "type_auth";
            DROP TYPE "public"."users_type_auth_enum";
            ALTER TABLE "users"
            ADD "type" character varying;
        `);
    }

}
