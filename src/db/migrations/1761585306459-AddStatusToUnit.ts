import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToUnit1761585306459 implements MigrationInterface {
    name = 'AddStatusToUnit1761585306459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."unit_status_enum" AS ENUM('VACANT', 'OCCUPIED', 'BOOKED')`);
        await queryRunner.query(`ALTER TABLE "unit" ADD "status" "public"."unit_status_enum" NOT NULL DEFAULT 'VACANT'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."unit_status_enum"`);
    }

}
