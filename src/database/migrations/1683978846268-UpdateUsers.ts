import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1683978846268 implements MigrationInterface {
    name = 'UpdateUsers1683978846268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_976c9e51b32ba0b783241509b58";
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_976c9e51b32ba0b783241509b58" FOREIGN KEY ("storage_id") REFERENCES "storages"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_976c9e51b32ba0b783241509b58";
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_976c9e51b32ba0b783241509b58" FOREIGN KEY ("storage_id") REFERENCES "storages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
