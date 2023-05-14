import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTweets1683982364124 implements MigrationInterface {
    name = 'UpdateTweets1683982364124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tweets" DROP CONSTRAINT "FK_0a23c50228c2db732e3214682b0";
            ALTER TABLE "tweets" DROP CONSTRAINT "FK_124b9633e2b4c7516240d8f1b8a";
            ALTER TABLE "tweets"
            ADD CONSTRAINT "FK_0a23c50228c2db732e3214682b0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE "tweets"
            ADD CONSTRAINT "FK_124b9633e2b4c7516240d8f1b8a" FOREIGN KEY ("storage_id") REFERENCES "storages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tweets" DROP CONSTRAINT "FK_124b9633e2b4c7516240d8f1b8a";
            ALTER TABLE "tweets" DROP CONSTRAINT "FK_0a23c50228c2db732e3214682b0";
            ALTER TABLE "tweets"
            ADD CONSTRAINT "FK_124b9633e2b4c7516240d8f1b8a" FOREIGN KEY ("storage_id") REFERENCES "storages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
            ALTER TABLE "tweets"
            ADD CONSTRAINT "FK_0a23c50228c2db732e3214682b0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
