import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1686756888571 implements MigrationInterface {
  name = "UpdateUsers1686756888571";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "cover" character varying;
            ALTER TABLE "users"
            ADD "bio" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "bio";
            ALTER TABLE "users" DROP COLUMN "cover"
        `);
  }
}
