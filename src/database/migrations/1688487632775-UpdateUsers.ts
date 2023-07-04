import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1688487632775 implements MigrationInterface {
  name = "UpdateUsers1688487632775";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."users_gender_enum" AS ENUM('Male', 'Female', 'Other');
            ALTER TABLE "users"
            ADD "gender" "public"."users_gender_enum"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "gender";
            DROP TYPE "public"."users_gender_enum"
        `);
  }
}
