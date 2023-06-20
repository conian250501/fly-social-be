import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1687071750504 implements MigrationInterface {
  name = "InitialDatabase1687071750504";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."likes_type_enum" AS ENUM('tweet', 'comment');
            CREATE TABLE "likes" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "type" "public"."likes_type_enum" NOT NULL DEFAULT 'tweet',
                "user_id" integer,
                "tweet_id" integer,
                "comment_id" integer,
                CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "likes";
            DROP TYPE "public"."likes_type_enum"
        `);
  }
}
