import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdditionsTable1761633733589 implements MigrationInterface {
    name = 'AddAdditionsTable1761633733589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" ADD "pkid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "unit" ADD "pkid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user_unit" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_unit" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "pkid"`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "pkid"`);
    }

}
