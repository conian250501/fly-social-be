import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStorageTweets1686669159987 implements MigrationInterface {
  name = "UpdateStorageTweets1686669159987";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2";
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "REL_357a2d7102ddaa95b4da1930dc";
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2";
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "REL_357a2d7102ddaa95b4da1930dc" UNIQUE ("tweet_id");
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }
}
