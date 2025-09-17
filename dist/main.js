"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const path_1 = require("path");
const app_module_1 = require("./app.module");
const fs = __importStar(require("fs"));
const LOGGER = new common_1.Logger('API');
if (!process.env.TZ) {
    LOGGER.error('Enviroment TZ is necessary');
    process.exit(0);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: process.env.NODE_ENV === 'development'
            ? ['log', 'debug', 'error', 'verbose', 'warn']
            : ['log', 'error', 'warn'],
    });
    const config = app.get(config_1.ConfigService);
    const envBasePath = config.get('BASEPATH');
    let basepath = '';
    if (envBasePath && envBasePath.length > 1) {
        basepath = envBasePath.endsWith('/')
            ? envBasePath.substring(0, envBasePath.length - 1)
            : envBasePath;
    }
    if (basepath !== '') {
        app.setGlobalPrefix(basepath);
    }
    app.use((0, helmet_1.default)());
    const configCORS = {
        origin: ['*'],
        methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
    };
    switch (process.env.NODE_ENV) {
        case 'development':
            configCORS.origin = [
                'http://0.0.0.0:3003',
                config.get('FRONT_URL') || '',
            ];
            break;
        case 'production':
            configCORS.origin = [config.get('FRONT_URL') || ''];
            break;
    }
    app.enableCors({
        origin: '*',
        methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
    });
    let swaggerPath = '';
    if (process.env.SWAGGER_DOCS && process.env.SWAGGER_DOCS === '1') {
        const configSwagger = new swagger_1.DocumentBuilder()
            .setTitle(config.get('DESCRIPTION') || 'FMA-API')
            .setVersion(config.get('VERSION') || '1.0')
            .addApiKey({
            type: 'apiKey',
            name: 'x-api-key',
            in: 'header',
            description: 'API Key For External calls',
        })
            .addBearerAuth({
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'JWT Token use Bearer',
        })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, configSwagger);
        fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
        swaggerPath = `${basepath}${basepath !== '' ? '/' : ''}api-docs`;
        swagger_1.SwaggerModule.setup(swaggerPath, app, document);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'files'), {
        index: false,
        prefix: '/files',
    });
    await app.listen(config.get('PORT') || 3000);
    LOGGER.log(`FMA-API Time Zone - ${config.get('TZ')}`);
    LOGGER.log(`FMA-API Started - ${await app.getUrl()}/${basepath}`);
    LOGGER.log(`Swagger Docs - ${await app.getUrl()}/${basepath}${basepath !== '' ? '/' : ''}api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map