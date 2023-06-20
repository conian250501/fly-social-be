import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1687072744116 implements MigrationInterface {
  name = "InitialDatabase1687072744116";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_cdca270ba1f5105a09e64562fef" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_cdca270ba1f5105a09e64562fef";

            ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"
        `);
  }
}
