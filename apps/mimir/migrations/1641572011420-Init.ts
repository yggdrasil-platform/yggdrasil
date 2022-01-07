import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1641572011420 implements MigrationInterface {
  name = 'Init1641572011420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "authentication" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "UQ_2ce04c38ee386596885c903d9ad" UNIQUE ("userId"), CONSTRAINT "PK_684fcb9924c8502d64b129cc8b1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "authentication"`);
  }
}
