import {MigrationInterface, QueryRunner} from "typeorm";

export class editcampaigntable1679784628772 implements MigrationInterface {
    name = 'editcampaigntable1679784628772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "investmentType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "dealType" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "dealType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "campaigns" ALTER COLUMN "investmentType" SET NOT NULL`);
    }

}
