import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateComments1683977459100 implements MigrationInterface {
    name = 'UpdateComments1683977459100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tweets_comments" (
                "comment_id" integer NOT NULL,
                "tweet_id" integer NOT NULL,
                CONSTRAINT "PK_14ed063bdf264b1982e0c2a2451" PRIMARY KEY ("comment_id", "tweet_id")
            );
            CREATE INDEX "IDX_78587931d10b19e88d3a740ad5" ON "tweets_comments" ("comment_id");
            CREATE INDEX "IDX_f23e379534b02853e64b54a3c4" ON "tweets_comments" ("tweet_id");
            ALTER TABLE "tweets_comments"
            ADD CONSTRAINT "FK_78587931d10b19e88d3a740ad59" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE "tweets_comments"
            ADD CONSTRAINT "FK_f23e379534b02853e64b54a3c44" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tweets_comments" DROP CONSTRAINT "FK_f23e379534b02853e64b54a3c44";
            ALTER TABLE "tweets_comments" DROP CONSTRAINT "FK_78587931d10b19e88d3a740ad59";
            DROP INDEX "public"."IDX_f23e379534b02853e64b54a3c4";
            DROP INDEX "public"."IDX_78587931d10b19e88d3a740ad5";
            DROP TABLE "tweets_comments";
        `);
    }

}
