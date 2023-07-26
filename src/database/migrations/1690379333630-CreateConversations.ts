import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConversations1690379333630 implements MigrationInterface {
  name = "CreateConversations1690379333630";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "conversations" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "sender_id" integer,
                "receiver_id" integer,
                CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id")
            );

            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_e3c404a3d131a6e14028623bb76" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_ec8f1ab69cfd2439bc5603a663a" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "conversations" DROP CONSTRAINT "FK_ec8f1ab69cfd2439bc5603a663a";

            ALTER TABLE "conversations" DROP CONSTRAINT "FK_e3c404a3d131a6e14028623bb76";

            DROP TABLE "conversations";

        `);
  }
}
