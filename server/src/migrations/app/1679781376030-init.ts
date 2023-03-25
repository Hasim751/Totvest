import {MigrationInterface, QueryRunner} from "typeorm";

export class init1679781376030 implements MigrationInterface {
    name = 'init1679781376030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying, "mobile" character varying NOT NULL, "userType" character varying NOT NULL, "avatar" character varying, "address" text, "email" character varying NOT NULL, "password" character varying, "hashRt" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" SERIAL NOT NULL, "campaignId" character varying NOT NULL, "userId" character varying NOT NULL, "campaignName" text NOT NULL, "tenure" text NOT NULL, "investmentType" character varying NOT NULL, "dealType" character varying NOT NULL, "discount" character varying, "minSubscription" character varying, "target" character varying, "endDate" TIMESTAMP, "docs" character varying, "returnRate" character varying, "video" text, "subscribers" character varying, "subscriptionDays" character varying, "capitalToRaise" character varying, "subscriptionOffered" character varying, "highlights" character varying, CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "campaigns"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
