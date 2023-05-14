;;import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1683356613320 implements MigrationInterface {
    name = 'UpdateUsers1683356613320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "facebook_id" character varying;
            ALTER TABLE "users"
            ADD "github_id" character varying;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "github_id";
            ALTER TABLE "users" DROP COLUMN "facebook_id";
        `);
    }

}
