import { WeatherParser } from '../../../../../domain/service/weather/weather.parser';
import { Weather } from '../../../../../domain/valueobject/weather.vo';
import { Injectable } from '@nestjs/common';
import { WeatherRealtimeDto } from './weather-realtime.dto';
import { UnexpectedWeatherFormatException } from '../../../../../domain/exception/unexpected-weather-format.exception';

@Injectable()
export class WeatherRealtimeTxtParser implements WeatherParser {
  private readonly structure: Map<string, number> = new Map([
    ['date', 0],
    ['time', 1],
    ['temp', 2],
    ['humidity', 3],
    ['dewpoint', 4],
    ['wspeed', 5],
    ['wlatest', 6],
    ['bearing', 7],
    ['rrate', 8],
    ['rfall', 9],
    ['press', 10],
    ['currentwdir', 11],
    ['beaufortnumber', 12],
    ['windunit', 13],
    ['tempunitnodeg', 14],
    ['pressunit', 15],
    ['rainunit', 16],
    ['windrun', 17],
    ['presstrendval', 18],
    ['rmonth', 19],
    ['ryear', 20],
    ['rfallY', 21],
    ['intemp', 22],
    ['inhum', 23],
    ['wchill', 24],
    ['temptrend', 25],
    ['tempTH', 26],
    ['TtempTH', 27],
    ['tempTL', 28],
    ['TtempTL', 29],
    ['windTM', 30],
    ['TwindTM', 31],
    ['wgustTM', 32],
    ['TwgustTM', 33],
    ['pressTH', 34],
    ['TpressTH', 35],
    ['pressTL', 36],
    ['TpressTL', 37],
    ['version', 38],
    ['build', 39],
    ['wgust', 40],
    ['heatindex', 41],
    ['humidex', 42],
    ['UV', 43],
    ['ET', 44],
    ['SolarRad', 45],
    ['avgbearing', 46],
    ['rhour', 47],
    ['forecastnumber', 48],
    ['isdaylight', 49],
    ['SensorContactLost', 50],
    ['wdir', 51],
    ['cloudbasevalue', 52],
    ['cloudbaseunit', 53],
    ['apptemp', 54],
    ['SunshineHours', 55],
    ['CurrentSolarMax', 56],
    ['IsSunny', 57],
  ]);

  parse(s: string): Weather {
    const data = s.split(' ') as Array<string>;
    if (data.length !== 59) {
      throw UnexpectedWeatherFormatException.create();
    }

    const dto = [...this.structure.entries()].reduce(
      (acc, [value, key]) => ({
        ...acc,
        [value]: data[key],
      }),
      {} as WeatherRealtimeDto,
    );

    return new Weather(dto.time, dto.date, dto.wspeed, dto.wgust, dto.bearing, dto.temp, dto.cloudbasevalue, dto.press);
  }
}
