-- DropForeignKey
ALTER TABLE `vantagem` DROP FOREIGN KEY `Vantagem_empresaId_fkey`;

-- DropIndex
DROP INDEX `Vantagem_empresaId_fkey` ON `vantagem`;

-- AddForeignKey
ALTER TABLE `Vantagem` ADD CONSTRAINT `Vantagem_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
