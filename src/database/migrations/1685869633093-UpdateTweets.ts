import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTweets1685869633093 implements MigrationInterface {
    name = 'UpdateTweets1685869633093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tweets"
            ADD "is_private" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tweets" DROP COLUMN "is_private"
        `);
    }

}
