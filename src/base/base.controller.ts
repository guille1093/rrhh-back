import { PermissionsGuard } from '../auth/permissions.guard';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class BaseController {
  public logger: Logger;

  constructor(readonly object: { name: string }) {
    this.logger = new Logger(this.object.name);
  }
}
