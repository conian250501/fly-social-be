import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConversations1691333814311 implements MigrationInterface {
  name = "UpdateConversations1691333814311";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD "is_group" boolean NOT NULL DEFAULT false;

            ALTER TABLE "conversations"
            ADD "group_name" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "conversations" DROP COLUMN "group_name";
            
            ALTER TABLE "conversations" DROP COLUMN "is_group"
        `);
  }
}
