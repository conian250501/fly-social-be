import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateComments1683975628776 implements MigrationInterface {
    name = 'CreateComments1683975628776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."comments_type_enum" AS ENUM('tweet', 'comment');
            CREATE TABLE "comments" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "type" "public"."comments_type_enum" NOT NULL DEFAULT 'tweet',
                "userId" integer,
                CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
            );
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749";
            DROP TABLE "comments";
            DROP TYPE "public"."comments_type_enum";
        `);
    }

}
