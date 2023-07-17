import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStatusUsers1689599102644 implements MigrationInterface {
  name = "UpdateStatusUsers1689599102644";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."users_status_enum" AS ENUM('Active', 'InActive');
            ALTER TABLE "users"
            ADD "status" "public"."users_status_enum" NOT NULL DEFAULT 'Active'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "status";
            DROP TYPE "public"."users_status_enum"
        `);
  }
}
