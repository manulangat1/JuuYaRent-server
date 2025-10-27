import { MigrationInterface, QueryRunner } from "typeorm";

export class AgentTable1761572562345 implements MigrationInterface {
    name = 'AgentTable1761572562345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agent" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "portfolioId" integer, CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agent" ADD CONSTRAINT "FK_e5129e02bee0482305c163f6e40" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agent" DROP CONSTRAINT "FK_e5129e02bee0482305c163f6e40"`);
        await queryRunner.query(`DROP TABLE "agent"`);
    }

}
