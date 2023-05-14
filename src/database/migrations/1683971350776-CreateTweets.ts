import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTweets1683971350776 implements MigrationInterface {
    name = 'CreateTweets1683971350776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tweets" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "content" character varying,
                "image" character varying,
                "video" character varying,
                "user_id" integer,
                CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id")
            );
            ALTER TABLE "tweets"
            ADD CONSTRAINT "FK_0a23c50228c2db732e3214682b0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tweets" DROP CONSTRAINT "FK_0a23c50228c2db732e3214682b0";
            DROP TABLE "tweets"
        `);
    }

}
