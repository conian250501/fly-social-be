import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1687081808799 implements MigrationInterface {
  name = "UpdateUsers1687081808799";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "follows" DROP CONSTRAINT "FK_c518e3988b9c057920afaf2d8c0";
            ALTER TABLE "follows"
            RENAME COLUMN "following_id" TO "user_id";
            ALTER TABLE "follows"
            ADD CONSTRAINT "FK_941d172275662c2b9d8b9f4270c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "follows" DROP CONSTRAINT "FK_941d172275662c2b9d8b9f4270c";
            ALTER TABLE "follows"
            RENAME COLUMN "user_id" TO "following_id";
            ALTER TABLE "follows"
            ADD CONSTRAINT "FK_c518e3988b9c057920afaf2d8c0" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE

        `);
  }
}
