import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConversations1690535716929 implements MigrationInterface {
  name = "UpdateConversations1690535716929";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD "host_id" integer;

            ALTER TABLE "conversations"
            ADD "participant_id" integer;
            
            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_69b003269a8017ff3b381f81713" FOREIGN KEY ("host_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            
            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_ce5300b283e93c2b186df51cd0c" FOREIGN KEY ("participant_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "conversations" DROP CONSTRAINT "FK_ce5300b283e93c2b186df51cd0c";

            ALTER TABLE "conversations" DROP CONSTRAINT "FK_69b003269a8017ff3b381f81713";

            ALTER TABLE "conversations" DROP COLUMN "participant_id";

            ALTER TABLE "conversations" DROP COLUMN "host_id";
        `);
  }
}
