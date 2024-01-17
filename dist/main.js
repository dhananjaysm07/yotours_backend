"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const express = require("express");
dotenv.config();
console.log("server running on", process.env.PORT, process.env.POSTGRES_URL);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });
    const httpsOptions = {
        key: fs.readFileSync("/etc/ssl/yourbackend/private.key"),
        cert: fs.readFileSync("/etc/ssl/yourbackend/certificate.crt"),
    };
    const expressApp = express();
    expressApp.use(app.getHttpAdapter().getInstance());
    const server = https.createServer(httpsOptions, expressApp);
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map