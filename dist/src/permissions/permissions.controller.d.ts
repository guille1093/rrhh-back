import { BaseController } from '../base/base.controller';
export declare class PermissionsController extends BaseController {
    private readonly permissionsService;
    constructor();
    findAll(): Promise<import("./entities/permission.entity").Permission[]>;
}
