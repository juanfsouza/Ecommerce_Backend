-- DropIndex
DROP INDEX "Product_name_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "stripePriceId" TEXT,
ADD COLUMN     "stripeProductId" TEXT;
