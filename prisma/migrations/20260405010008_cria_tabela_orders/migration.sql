-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('AGUARDANDO', 'RETIRADA', 'ENTREGUE', 'DEVOLVIDA');

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'AGUARDANDO',
    "address" TEXT NOT NULL,
    "carryingId" TEXT,
    "customerId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "order_id_key" ON "order"("id");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_carryingId_fkey" FOREIGN KEY ("carryingId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
