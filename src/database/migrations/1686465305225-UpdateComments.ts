import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateComments1686465305225 implements MigrationInterface {
  name = "UpdateComments1686465305225";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749";
            ALTER TABLE "comments" DROP COLUMN "userId";
            ALTER TABLE "comments" DROP COLUMN "type_comment_id";
            ALTER TABLE "comments"
            ADD "content" character varying;
            ALTER TABLE "comments"
            ADD "file" character varying;
            ALTER TABLE "comments"
            ADD "user_id" integer;
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d";
            ALTER TABLE "comments" DROP COLUMN "user_id";
            ALTER TABLE "comments" DROP COLUMN "file";
            ALTER TABLE "comments" DROP COLUMN "content";
            ALTER TABLE "comments"
            ADD "type_comment_id" integer NOT NULL;
            ALTER TABLE "comments"
            ADD "userId" integer;
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
