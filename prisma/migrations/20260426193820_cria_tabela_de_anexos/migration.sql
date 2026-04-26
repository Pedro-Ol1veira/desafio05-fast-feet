-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "orderId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_id_key" ON "Attachment"("id");

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
