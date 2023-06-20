import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1687072148939 implements MigrationInterface {
  name = "InitialDatabase1687072148939";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."comments_type_enum" AS ENUM('tweet', 'comment');
            CREATE TABLE "comments" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "content" character varying,
                "image" character varying,
                "video" character varying,
                "type" "public"."comments_type_enum" NOT NULL DEFAULT 'tweet',
                "user_id" integer,
                "tweet_id" integer,
                CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "comments";
            DROP TYPE "public"."comments_type_enum"
        `);
  }
}
