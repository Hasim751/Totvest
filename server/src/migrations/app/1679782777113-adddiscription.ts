import {MigrationInterface, QueryRunner} from "typeorm";

export class adddiscription1679782777113 implements MigrationInterface {
    name = 'adddiscription1679782777113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "description"`);
    }

}
