import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1687072538799 implements MigrationInterface {
  name = "InitialDatabase1687072538799";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE "storage_tweets"
            ADD CONSTRAINT "FK_8afa0822bfc6903dd64b2f7801f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "FK_8afa0822bfc6903dd64b2f7801f";
            ALTER TABLE "storage_tweets" DROP CONSTRAINT "FK_357a2d7102ddaa95b4da1930dc2"
        `);
  }
}
