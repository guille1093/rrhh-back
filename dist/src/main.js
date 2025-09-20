"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const helmet_1 = __importDefault(require("helmet"));
const path_1 = require("path");
const app_module_1 = require("./app.module");
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
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'files'), {
        index: false,
        prefix: '/files',
    });
    await app.listen(config.get('PORT') || 3000);
    LOGGER.log(`RRHH-API Time Zone - ${config.get('TZ')}`);
    LOGGER.log(`RRHH-API Started - ${await app.getUrl()}/${basepath}`);
    LOGGER.log(`Swagger Docs - ${await app.getUrl()}/${basepath}${basepath !== '' ? '/' : ''}api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map