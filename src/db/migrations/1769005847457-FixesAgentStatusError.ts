import { MigrationInterface, QueryRunner } from "typeorm";

export class FixesAgentStatusError1769005847457 implements MigrationInterface {
    name = 'FixesAgentStatusError1769005847457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent" ALTER COLUMN "status" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent" ALTER COLUMN "status" SET DEFAULT '0'`);
    }

}
