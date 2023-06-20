import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1687072259199 implements MigrationInterface {
  name = "InitialDatabase1687072259199";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "follows" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "follower_id" integer,
                "following_id" integer,
                CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "follows"
        `);
  }
}
