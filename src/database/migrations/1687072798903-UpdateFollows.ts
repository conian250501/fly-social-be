import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1687072798903 implements MigrationInterface {
  name = "InitialDatabase1687072798903";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "follows"
            ADD CONSTRAINT "FK_54b5dc2739f2dea57900933db66" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE "follows"
            ADD CONSTRAINT "FK_c518e3988b9c057920afaf2d8c0" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "follows" DROP CONSTRAINT "FK_c518e3988b9c057920afaf2d8c0";
            ALTER TABLE "follows" DROP CONSTRAINT "FK_54b5dc2739f2dea57900933db66"
        `);
  }
}
