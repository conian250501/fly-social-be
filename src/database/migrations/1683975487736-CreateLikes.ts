import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLikes1683975487736 implements MigrationInterface {
  name = "CreateLikes1683975487736";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."likes_type_enum" AS ENUM('tweet', 'comment');
            CREATE TABLE "likes" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "type" "public"."likes_type_enum" NOT NULL DEFAULT 'tweet',
                "type_like_id" integer NOT NULL,
                "user_id" integer,
                CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id")
            );
            ALTER TABLE "likes"
            ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171";
            DROP TABLE "likes";
            DROP TYPE "public"."likes_type_enum";
        `);
  }
}
