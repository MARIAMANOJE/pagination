-- CreateTable
CREATE TABLE `Movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `releaseYear` INTEGER NOT NULL,
    `Actor` VARCHAR(191) NOT NULL,
    `director` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
