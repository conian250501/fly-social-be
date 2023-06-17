import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1686993801116 implements MigrationInterface {
  name = "UpdateUsers1686993801116";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "website" character varying;
            ALTER TABLE "users"
            ADD "birth_date" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "birth_date";
            ALTER TABLE "users" DROP COLUMN "website";
        `);
  }
}
