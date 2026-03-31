-- AlterTable
ALTER TABLE "Schedules" ADD COLUMN     "atleta_id" TEXT;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_atleta_id_fkey" FOREIGN KEY ("atleta_id") REFERENCES "Atletas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
