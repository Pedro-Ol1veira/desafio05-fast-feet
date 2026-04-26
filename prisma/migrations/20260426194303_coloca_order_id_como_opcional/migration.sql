-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_orderId_fkey";

-- AlterTable
ALTER TABLE "Attachment" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
