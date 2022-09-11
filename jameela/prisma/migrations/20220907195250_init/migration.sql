-- CreateTable
CREATE TABLE "YTGetVideos" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YTGetVideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YTGetById" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "thumbnail" JSONB NOT NULL,
    "thumbnails" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YTGetById_pkey" PRIMARY KEY ("id")
);
