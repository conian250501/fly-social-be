import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1687071920723 implements MigrationInterface {
  name = "InitialDatabase1687071920723";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "storage_tweets" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "tweet_id" integer,
                "user_id" integer,
                CONSTRAINT "PK_83c681e5ea12d22bc3c1fb2e59f" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "storage_tweets"
        `);
  }
}
