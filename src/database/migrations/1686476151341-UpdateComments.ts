import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateComments1686476151341 implements MigrationInterface {
  name = "UpdateComments1686476151341";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "file";

            ALTER TABLE "comments"
            ADD "image" character varying;


            ALTER TABLE "comments"
            ADD "video" character varying

        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "video";

            ALTER TABLE "comments" DROP COLUMN "image";

            ALTER TABLE "comments"
            ADD "file" character varying
        `);
  }
}
