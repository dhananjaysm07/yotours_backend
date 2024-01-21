import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
dotenv.config();
console.log("server running on", process.env.PORT, process.env.POSTGRES_URL);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    // origin: ["http://localhost:5173", "http://localhost:3001"], // Specify the frontend origin
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // This allows session cookies to be sent back and forth
  });
  await app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}
bootstrap();

// import { ValidationPipe } from "@nestjs/common";
// import { NestFactory } from "@nestjs/core";
// import { ExpressAdapter } from "@nestjs/platform-express";
// import { AppModule } from "./app.module";
// import * as dotenv from "dotenv";
// import * as fs from "fs";
// import * as https from "https";
// import * as express from "express";

// dotenv.config();
// console.log("server running on", process.env.PORT, process.env.POSTGRES_URL);

// const httpsOptions = {
//   key: fs.readFileSync("/etc/apache2/ssl/key.txt"), // Path to your private key
//   cert: fs.readFileSync("/etc/apache2/ssl/9660acb64e35aee4.pem"), // Path to your certificate
//   ca: fs.readFileSync("/etc/apache2/ssl/gd_bundle-g2-g1.crt"),
// };
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, { httpsOptions });
//   app.useGlobalPipes(new ValidationPipe());
//   app.enableCors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   });

//   await app.listen(process.env.PORT, "0.0.0.0", () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
//   });
// }

// bootstrap();
