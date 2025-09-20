import { PermissionsGuard } from '../auth/permissions.guard';
import { Logger, UseGuards } from '@nestjs/common';

@UseGuards(PermissionsGuard)
export class BaseController {
  public logger: Logger;

  constructor(readonly object: { name: string }) {
    this.logger = new Logger(this.object.name);
  }
}
