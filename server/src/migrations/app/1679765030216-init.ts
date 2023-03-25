import {MigrationInterface, QueryRunner} from "typeorm";

export class init1679765030216 implements MigrationInterface {
    name = 'init1679765030216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying, "mobile" character varying NOT NULL, "userType" character varying NOT NULL, "avatar" character varying, "address" text, "email" character varying NOT NULL, "password" character varying, "hashRt" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
