import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConversationsParticipants1690636906628
  implements MigrationInterface
{
  name = "CreateConversationsParticipants1690636906628";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "conversations_participants" (
                "conversation_id" integer NOT NULL,
                "participant_id" integer NOT NULL,
                CONSTRAINT "PK_a126626767cc0c1f086361680e5" PRIMARY KEY ("conversation_id", "participant_id")
            );

            CREATE INDEX "IDX_725d34b6b37e478abaef5f843a" ON "conversations_participants" ("conversation_id");
           
            CREATE INDEX "IDX_025ac32993d2ba618c1dafa6be" ON "conversations_participants" ("participant_id");
            
            ALTER TABLE "conversations_participants"
            ADD CONSTRAINT "FK_725d34b6b37e478abaef5f843a5" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            
            ALTER TABLE "conversations_participants"
            ADD CONSTRAINT "FK_025ac32993d2ba618c1dafa6be1" FOREIGN KEY ("participant_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "conversations_participants" DROP CONSTRAINT "FK_025ac32993d2ba618c1dafa6be1";

            ALTER TABLE "conversations_participants" DROP CONSTRAINT "FK_725d34b6b37e478abaef5f843a5";

            DROP INDEX "public"."IDX_025ac32993d2ba618c1dafa6be";

            DROP INDEX "public"."IDX_725d34b6b37e478abaef5f843a";

            DROP TABLE "conversations_participants";
        `);
  }
}
