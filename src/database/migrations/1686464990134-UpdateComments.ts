import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateComments1686464990134 implements MigrationInterface {
  name = "UpdateComments1686464990134";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "tweet_id" integer;
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_cdca270ba1f5105a09e64562fef" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_cdca270ba1f5105a09e64562fef";
            ALTER TABLE "comments" DROP COLUMN "tweet_id"
        `);
  }
}
