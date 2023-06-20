import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1687072091949 implements MigrationInterface {
  name = "InitialDatabase1687072091949";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "tweets" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "content" character varying,
                "image" character varying,
                "video" character varying,
                "is_private" boolean NOT NULL DEFAULT false,
                "user_id" integer,
                CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "tweets"
        `);
  }
}
