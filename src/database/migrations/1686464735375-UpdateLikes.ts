import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLikes1686464735375 implements MigrationInterface {
  name = "UpdateLikes1686464735375";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "likes"
            ADD "comment_id" integer;
            ALTER TABLE "likes"
            ADD CONSTRAINT "FK_7cbd1e9a5c85ffab0611ec5f0ac" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "likes" DROP CONSTRAINT "FK_7cbd1e9a5c85ffab0611ec5f0ac";
            ALTER TABLE "likes" DROP COLUMN "comment_id"
        `);
  }
}
