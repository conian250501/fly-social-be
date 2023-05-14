import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTweets1683985111176 implements MigrationInterface {
    name = 'UpdateTweets1683985111176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tweets" DROP CONSTRAINT "FK_124b9633e2b4c7516240d8f1b8a";
            ALTER TABLE "users" DROP CONSTRAINT "FK_976c9e51b32ba0b783241509b58";
            CREATE TABLE "storage_tweets" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "tweet_id" integer,
                "userId" integer,
                CONSTRAINT "REL_357a2d7102ddaa95b4da1930dc" UNIQUE ("tweet_id"),
                CONSTRAINT "PK_83c681e5ea12d22bc3c1fb2e59f" PRIMARY KEY ("id")
            );
            ALTER TABLE "tweets" DROP COLUMN "storage_id";
            ALTER TABLE "users" DROP CONSTRAINT "UQ_976c9e51b32ba0b783241509b58";
            ALTER TABLE "users" DROP COLUMN "storage_id";
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "FK_90029a4ca840c0b65e2d67268b0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "FK_90029a4ca840c0b65e2d67268b0";
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2";
            ALTER TABLE "users"
            ADD "storage_id" integer;
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_976c9e51b32ba0b783241509b58" UNIQUE ("storage_id");
            ALTER TABLE "tweets"
            ADD "storage_id" integer;
            DROP TABLE "storage_tweets";
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_976c9e51b32ba0b783241509b58" FOREIGN KEY ("storage_id") REFERENCES "storages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE "tweets"
            ADD CONSTRAINT "FK_124b9633e2b4c7516240d8f1b8a" FOREIGN KEY ("storage_id") REFERENCES "storages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }

}
