import { MigrationInterface, QueryRunner } from "typeorm";

export class FixesAgentStatusError1769005797599 implements MigrationInterface {
    name = 'FixesAgentStatusError1769005797599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent" ALTER COLUMN "status" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent" ALTER COLUMN "status" SET NOT NULL`);
    }

}
