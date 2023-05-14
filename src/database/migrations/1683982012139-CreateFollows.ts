import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFollows1683982012139 implements MigrationInterface {
    name = 'CreateFollows1683982012139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "follows" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "follower_id" integer,
                "following_id" integer,
                CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id")
            );
            ALTER TABLE "follows"
            ADD CONSTRAINT "FK_54b5dc2739f2dea57900933db66" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE "follows"
            ADD CONSTRAINT "FK_c518e3988b9c057920afaf2d8c0" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "follows" DROP CONSTRAINT "FK_c518e3988b9c057920afaf2d8c0";
            ALTER TABLE "follows" DROP CONSTRAINT "FK_54b5dc2739f2dea57900933db66";
            DROP TABLE "follows";
        `);
    }

}
