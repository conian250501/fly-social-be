import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMessages1690535959042 implements MigrationInterface {
  name = "UpdateMessages1690535959042";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "author_id" integer;

            ALTER TABLE "messages"
            ADD "conversation_id" integer;
            
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_05535bc695e9f7ee104616459d3" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            
            ALTER TABLE "messages"
            ADD CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "messages" DROP CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23";

            ALTER TABLE "messages" DROP CONSTRAINT "FK_05535bc695e9f7ee104616459d3";

            ALTER TABLE "messages" DROP COLUMN "conversation_id";

            ALTER TABLE "messages" DROP COLUMN "author_id";
        `);
  }
}
