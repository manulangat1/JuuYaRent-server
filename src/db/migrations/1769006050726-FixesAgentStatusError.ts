import { MigrationInterface, QueryRunner } from "typeorm";

export class FixesAgentStatusError1769006050726 implements MigrationInterface {
    name = 'FixesAgentStatusError1769006050726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."agent_status_enum" RENAME TO "agent_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."agent_status_enum" AS ENUM('REGISTERED', 'EMAIL_VALIDATED', 'BLACK_LISTED', 'DELETED')`);
        await queryRunner.query(`ALTER TABLE "agent" ALTER COLUMN "status" TYPE "public"."agent_status_enum" USING "status"::"text"::"public"."agent_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."agent_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."agent_status_enum_old" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "agent" ALTER COLUMN "status" TYPE "public"."agent_status_enum_old" USING "status"::"text"::"public"."agent_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."agent_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."agent_status_enum_old" RENAME TO "agent_status_enum"`);
    }

}
