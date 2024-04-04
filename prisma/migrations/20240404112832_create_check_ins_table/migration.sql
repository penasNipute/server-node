-- CreateTable
CREATE TABLE "check-ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attende_id" INTEGER NOT NULL,
    CONSTRAINT "check-ins_attende_id_fkey" FOREIGN KEY ("attende_id") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "check-ins_attende_id_key" ON "check-ins"("attende_id");
