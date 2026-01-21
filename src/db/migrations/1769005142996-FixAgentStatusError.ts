import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAgentStatusError1769005142996 implements MigrationInterface {
    name = 'FixAgentStatusError1769005142996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."agent_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "status" "public"."agent_status_enum" NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."agent_status_enum"`);
        await queryRunner.query(`ALTER TABLE "agent" ADD "status" integer NOT NULL DEFAULT '0'`);
    }

}
