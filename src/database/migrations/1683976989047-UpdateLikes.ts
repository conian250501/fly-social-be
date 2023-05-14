import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLikes1683976989047 implements MigrationInterface {
    name = 'UpdateLikes1683976989047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tweets_likes" (
                "like_id" integer NOT NULL,
                "tweet_id" integer NOT NULL,
                CONSTRAINT "PK_a056d7f16754ae1f10c5939b55b" PRIMARY KEY ("like_id", "tweet_id")
            );
            CREATE INDEX "IDX_60484f29b2f60e21e8c946fc4f" ON "tweets_likes" ("like_id");
            CREATE INDEX "IDX_f1add098cbfe2887eab7453982" ON "tweets_likes" ("tweet_id");
            ALTER TABLE "tweets_likes"
            ADD CONSTRAINT "FK_60484f29b2f60e21e8c946fc4f4" FOREIGN KEY ("like_id") REFERENCES "likes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE "tweets_likes"
            ADD CONSTRAINT "FK_f1add098cbfe2887eab74539827" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tweets_likes" DROP CONSTRAINT "FK_f1add098cbfe2887eab74539827";
            ALTER TABLE "tweets_likes" DROP CONSTRAINT "FK_60484f29b2f60e21e8c946fc4f4";
            DROP INDEX "public"."IDX_f1add098cbfe2887eab7453982";
            DROP INDEX "public"."IDX_60484f29b2f60e21e8c946fc4f";
            DROP TABLE "tweets_likes";
        `);
    }

}
