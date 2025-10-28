import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUnitToProperty1761584266604 implements MigrationInterface {
    name = 'AddUnitToProperty1761584266604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "rentPerMonth" character varying NOT NULL, "propertyId" integer, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "FK_df297555036819b1a6e1ebe777b" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "FK_df297555036819b1a6e1ebe777b"`);
        await queryRunner.query(`DROP TABLE "unit"`);
    }

}
