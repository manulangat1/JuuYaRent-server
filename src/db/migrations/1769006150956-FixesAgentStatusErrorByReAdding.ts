import { MigrationInterface, QueryRunner } from "typeorm";

export class FixesAgentStatusErrorByReAdding1769006150956 implements MigrationInterface {
    name = 'FixesAgentStatusErrorByReAdding1769006150956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."agent_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."agent_status_enum" AS ENUM('REGISTERED', 'EMAIL_VALIDATED', 'BLACK_LISTED', 'DELETED')`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "status" "public"."agent_status_enum"`);
    }

}
