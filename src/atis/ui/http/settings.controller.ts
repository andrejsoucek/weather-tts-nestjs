import { Controller, Get, Render } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetConfigQuery } from '../../application/query/get-config.query';
import { Config } from '../../domain/valueobject/config.vo';
import { SelectOption } from './select-option.interface';
import { Comparator } from '../../domain/enum/comparator.enum';
import { TextCondition } from '../../domain/valueobject/text-condition.vo';

@Controller('/settings')
export class SettingsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @Render('settings/index')
  async renderSettings(): Promise<{
    config: Config;
    languages: string[];
    tzs: string[];
    rwySettings: any /*TODO*/;
    circuitSettings: any /*TODO*/;
  }> {
    const config = (await this.queryBus.execute(new GetConfigQuery())) as Config;
    const languages = []; // @TODO
    const tzs = []; // @TODO
    const rwySettings = config.message.rwy.map(this.mapConditions);
    const circuitSettings = config.message.circuits.map(this.mapConditions);
    return { config, languages, tzs, rwySettings, circuitSettings };
  }

  private mapConditions = (c: TextCondition) => ({ ...c, options: this.getComparators(c.comparator) });

  private getComparators = (selected: string): SelectOption[] =>
    Object.values(Comparator).map((v) => ({
      id: v,
      label: v,
      selected: v === selected,
    }));
}
