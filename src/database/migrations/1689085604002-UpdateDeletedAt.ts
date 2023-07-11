import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDeletedAt1689085604002 implements MigrationInterface {
  name = "UpdateDeletedAt1689085604002";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "likes"
            ADD "deleted_at" TIMESTAMP;
            ALTER TABLE "storage_tweets"
            ADD "deleted_at" TIMESTAMP;
            ALTER TABLE "tweets"
            ADD "deleted_at" TIMESTAMP;
            ALTER TABLE "comments"
            ADD "deleted_at" TIMESTAMP;
            ALTER TABLE "follows"
            ADD "deleted_at" TIMESTAMP;
            ALTER TABLE "users"
            ADD "deleted_at" TIMESTAMP;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "deleted_at";
            ALTER TABLE "follows" DROP COLUMN "deleted_at";
            ALTER TABLE "comments" DROP COLUMN "deleted_at";
            ALTER TABLE "tweets" DROP COLUMN "deleted_at";
            ALTER TABLE "storage_tweets" DROP COLUMN "deleted_at";
            ALTER TABLE "likes" DROP COLUMN "deleted_at"
        `);
  }
}
