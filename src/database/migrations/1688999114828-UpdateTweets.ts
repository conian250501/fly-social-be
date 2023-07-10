import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTweets1688999114828 implements MigrationInterface {
  name = "UpdateTweets1688999114828";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."tweets_status_enum" AS ENUM('New', 'Archived', 'Pinned');
            ALTER TABLE "tweets"
            ADD "status" "public"."tweets_status_enum" NOT NULL DEFAULT 'New'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "tweets" DROP COLUMN "status";
            DROP TYPE "public"."tweets_status_enum"
        `);
  }
}
