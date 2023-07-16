import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1689490557980 implements MigrationInterface {
  name = "UpdateUsers1689490557980";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "role";
            
            CREATE TYPE "public"."users_role_enum" AS ENUM('User', 'Admin');
            
            ALTER TABLE "users"
            ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'User';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "role";
            
            DROP TYPE "public"."users_role_enum";
            
            ALTER TABLE "users"
            ADD "role" character varying NOT NULL DEFAULT 'user';
        `);
  }
}
