import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1687072429649 implements MigrationInterface {
  name = "InitialDatabase1687072429649";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "likes"
            ADD CONSTRAINT "FK_3f519ed95f775c781a254089171" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
            
            ALTER TABLE "likes"
            ADD CONSTRAINT "FK_da44986e692742c8a5c6d91be5b" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            
            ALTER TABLE "likes"
            ADD CONSTRAINT "FK_7cbd1e9a5c85ffab0611ec5f0ac" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "likes" DROP CONSTRAINT "FK_7cbd1e9a5c85ffab0611ec5f0ac";

            ALTER TABLE "likes" DROP CONSTRAINT "FK_da44986e692742c8a5c6d91be5b";
            
            ALTER TABLE "likes" DROP CONSTRAINT "FK_3f519ed95f775c781a254089171";
        `);
  }
}
