import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateComments1683977166569 implements MigrationInterface {
    name = 'UpdateComments1683977166569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "type_comment_id" integer NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "type_comment_id"
        `);
    }

}
