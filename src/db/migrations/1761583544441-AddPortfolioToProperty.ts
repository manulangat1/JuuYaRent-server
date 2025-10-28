import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPortfolioToProperty1761583544441 implements MigrationInterface {
    name = 'AddPortfolioToProperty1761583544441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" RENAME COLUMN "description" TO "portfolioId"`);
        await queryRunner.query(`ALTER TABLE "property" ALTER COLUMN "rentCollectionDate" SET DEFAULT '27'`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "portfolioId"`);
        await queryRunner.query(`ALTER TABLE "property" ADD "portfolioId" integer`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_77b7e4845bb30f516faca049089" FOREIGN KEY ("portfolioId") REFERENCES "portfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_77b7e4845bb30f516faca049089"`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "portfolioId"`);
        await queryRunner.query(`ALTER TABLE "property" ADD "portfolioId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "property" ALTER COLUMN "rentCollectionDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "property" RENAME COLUMN "portfolioId" TO "description"`);
    }

}
