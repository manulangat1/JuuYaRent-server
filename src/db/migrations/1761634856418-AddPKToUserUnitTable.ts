import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPKToUserUnitTable1761634856418 implements MigrationInterface {
    name = 'AddPKToUserUnitTable1761634856418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_unit_id_seq" OWNED BY "user_unit"."id"`);
        await queryRunner.query(`ALTER TABLE "user_unit" ALTER COLUMN "id" SET DEFAULT nextval('"user_unit_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_unit" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "user_unit_id_seq"`);
    }

}
