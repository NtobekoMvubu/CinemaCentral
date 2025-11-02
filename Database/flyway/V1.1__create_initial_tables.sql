CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "Movie" (
	"id" UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
	"title" VARCHAR NOT NULL,
	"originalTitle" VARCHAR NOT NULL,
	"overview" TEXT,
	"releaseDate" DATE NOT NULL,
	"poster" VARCHAR NULL,
	"votingAverage" INT,
	"adult" BOOL NOT NULL DEFAULT FALSE,
	"language" VARCHAR NOT NULL,
	"createdTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modifiedTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"active" BOOLEAN DEFAULT true
);

CREATE TABLE "User" (
	"id" UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
	"userName" VARCHAR,
	"name" VARCHAR NOT NULL,
	"surname" VARCHAR NOT null,
	"dateOfBirth" DATE NOT null,
	"gender" VARCHAR NOT null,
	"telephoneNumber" VARCHAR,
	"email" VARCHAR NOT NULL,
	"createdTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modifiedTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"active" BOOLEAN DEFAULT TRUE	
);

CREATE TABLE "Genre" (
	"id" INT UNIQUE PRIMARY KEY,
	"title" VARCHAR,
	"createdTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modifiedTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"active" BOOLEAN DEFAULT TRUE
);

CREATE TABLE "Comment" (
	"id" UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
	"movieId" UUID NOT NULL REFERENCES "Movie"(id),
	"userId" UUID NOT NULL REFERENCES "User"("id"),
	"comment" TEXT NOT NULL,
	"createdTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modifiedTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"active" BOOLEAN DEFAULT TRUE
);

CREATE TABLE "MovieGenre" (
	"id" UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
	"GenreId" INT NOT NULL REFERENCES "Genre"("id"),
	"movieId" UUID  NOT NULL REFERENCES "Movie"("id"),
	"createdTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modifiedTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"active" BOOLEAN DEFAULT TRUE
);

CREATE TABLE "MovieLike" (
	"id" UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
	"userId" UUID NOT NULL REFERENCES "User"("id"),
	"movieId" UUID NOT NULL REFERENCES "Movie"("id"),
	"createdTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modifiedTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"active" BOOLEAN DEFAULT TRUE
);

CREATE TABLE "CommentLike" (
	"id" UUID UNIQUE PRIMARY KEY DEFAULT uuid_generate_v4(),
	"userId" UUID NOT NULL REFERENCES "User"("id"),
	"commentId" UUID NOT NULL REFERENCES "Comment"("id"),
	"createdTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modifiedTimestamp" TIMESTAMP NOT NULL DEFAULT NOW(),
	"active" BOOLEAN DEFAULT TRUE
);