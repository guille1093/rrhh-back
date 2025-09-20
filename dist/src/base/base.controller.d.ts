import { Logger } from '@nestjs/common';
export declare class BaseController {
    readonly object: {
        name: string;
    };
    logger: Logger;
    constructor(object: {
        name: string;
    });
}
