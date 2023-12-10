"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
dotenv.config();
console.log("server running on", process.env.PORT, process.env.POSTGRES_URL);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: ["http://localhost:5173", "http://localhost:3001"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map