import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1682948080198 implements MigrationInterface {
    name = 'CreateUsers1682948080198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "avatar" character varying,
                "email" character varying,
                "name" character varying,
                "nickname" character varying,
                "phone" character varying,
                "address" character varying,
                "type" character varying,
                "role" character varying NOT NULL DEFAULT 'user',
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
