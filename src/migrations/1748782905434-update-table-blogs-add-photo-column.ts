import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTableBlogsAddPhotoColumn1748782905434
  implements MigrationInterface
{
  name = 'UpdateTableBlogsAddPhotoColumn1748782905434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`blogs\` ADD \`photo\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`photo\``);
  }
}
