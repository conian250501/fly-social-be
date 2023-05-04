import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1682951255135 implements MigrationInterface {
    name = 'UpdateUsers1682951255135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
    }

}
