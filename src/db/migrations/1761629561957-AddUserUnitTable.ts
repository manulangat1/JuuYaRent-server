import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserUnitTable1761629561957 implements MigrationInterface {
    name = 'AddUserUnitTable1761629561957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_unit" ("id" integer NOT NULL, "pkid" uuid NOT NULL DEFAULT uuid_generate_v4(), "movedInDate" TIMESTAMP NOT NULL, "depositPaid" boolean NOT NULL DEFAULT true, "noticeGive" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "unitId" integer, CONSTRAINT "PK_aecee70118de07f1ad94de52102" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_unit" ADD CONSTRAINT "FK_f62cbc62e66eca839215d4fc731" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_unit" ADD CONSTRAINT "FK_ffab9a0a2dc8a3b6c9a432552d7" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_unit" DROP CONSTRAINT "FK_ffab9a0a2dc8a3b6c9a432552d7"`);
        await queryRunner.query(`ALTER TABLE "user_unit" DROP CONSTRAINT "FK_f62cbc62e66eca839215d4fc731"`);
        await queryRunner.query(`DROP TABLE "user_unit"`);
    }

}
