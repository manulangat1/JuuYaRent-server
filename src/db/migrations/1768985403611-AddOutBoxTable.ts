import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOutBoxTable1768985403611 implements MigrationInterface {
    name = 'AddOutBoxTable1768985403611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "outbox_table" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'REGISTERED', "topic" character varying NOT NULL, "aggregateType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a698c46d04571409e6eaacfe635" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_63879277a6057bbaa82bb3a62c" ON "outbox_table" ("status", "topic", "aggregateType") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_63879277a6057bbaa82bb3a62c"`);
        await queryRunner.query(`DROP TABLE "outbox_table"`);
    }

}
