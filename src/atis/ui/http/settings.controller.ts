import { Controller, Get, Render } from '@nestjs/common';

@Controller('/settings')
export class SettingsController {
  @Get()
  @Render('settings/index')
  renderSettings(): void {
    return;
  }
}
