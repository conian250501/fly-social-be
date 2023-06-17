import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLikes1686464353168 implements MigrationInterface {
  name = "UpdateLikes1686464353168";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "likes"
                RENAME COLUMN "type_like_id" TO "tweet_id";
            ALTER TABLE "likes"
            ALTER COLUMN "tweet_id" DROP NOT NULL;
            ALTER TABLE "likes"
            ADD CONSTRAINT "FK_da44986e692742c8a5c6d91be5b" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "likes" DROP CONSTRAINT "FK_da44986e692742c8a5c6d91be5b";

            ALTER TABLE "likes"
            ALTER COLUMN "tweet_id"
            SET NOT NULL;
            
            ALTER TABLE "likes"
                RENAME COLUMN "tweet_id" TO "type_like_id"
        `);
  }
}
