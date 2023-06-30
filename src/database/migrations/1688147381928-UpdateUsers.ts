import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1688147381928 implements MigrationInterface {
  name = "UpdateUsers1688147381928";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "verified" boolean NOT NULL DEFAULT false
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "verified"
        `);
  }
}
