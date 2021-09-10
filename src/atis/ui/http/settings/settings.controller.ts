import { Controller, Get, Render } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetConfigQuery } from '../../../application/query/get-config.query';
import { Config } from '../../../domain/valueobject/config.vo';
import { SelectOption } from '../select-option.interface';
import { Comparator } from '../../../domain/enum/comparator.enum';
import { TextCondition } from '../../../domain/valueobject/text-condition.vo';
import { SettingsTemplateProperties } from './settings-template.properties';
import { GetTtsLanguagesQuery } from '../../../application/query/get-tts-languages.query';

@Controller('/settings')
export class SettingsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @Render('settings/index')
  async renderSettings(): Promise<SettingsTemplateProperties> {
    const config = await this.queryBus.execute<GetConfigQuery, Config>(new GetConfigQuery());
    const languages = await this.queryBus.execute<GetTtsLanguagesQuery, string[]>(new GetTtsLanguagesQuery());
    const languagesOptions = languages.map(this.mapSelectOptions(config.tts.language));
    const tzs = []; // @TODO
    const rwySettings = config.message.rwy.map(this.mapTextConditions);
    const circuitSettings = config.message.circuits.map(this.mapTextConditions);
    return { config, languagesOptions, tzs, rwySettings, circuitSettings };
  }

  private mapTextConditions = (c: TextCondition) => ({
    ...c,
    options: Object.values(Comparator).map(this.mapSelectOptions(c.comparator)),
  });

  private mapSelectOptions =
    (selected: string) =>
    (val: string): SelectOption => ({ id: val, label: val, selected: selected === val });
}
