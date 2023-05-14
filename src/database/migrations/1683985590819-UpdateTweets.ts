import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTweets1683985590819 implements MigrationInterface {
    name = 'UpdateTweets1683985590819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2";
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "FK_90029a4ca840c0b65e2d67268b0";
            ALTER TABLE "storage_tweets"
                RENAME COLUMN "userId" TO "user_id";
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "FK_8afa0822bfc6903dd64b2f7801f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "FK_8afa0822bfc6903dd64b2f7801f";
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2";
            ALTER TABLE "storage_tweets"
                RENAME COLUMN "user_id" TO "userId";
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "FK_90029a4ca840c0b65e2d67268b0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);
    }

}
