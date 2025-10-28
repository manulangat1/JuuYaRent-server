import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPKToUserUnitTable1761635649845 implements MigrationInterface {
    name = 'AddPKToUserUnitTable1761635649845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_unit" ALTER COLUMN "movedInDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_unit" ALTER COLUMN "noticeGive" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_unit" ALTER COLUMN "noticeGive" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_unit" ALTER COLUMN "movedInDate" SET NOT NULL`);
    }

}
