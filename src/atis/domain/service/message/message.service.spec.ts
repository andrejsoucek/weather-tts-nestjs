import { MessageService } from './message.service';
import { Test } from '@nestjs/testing';
import moment = require('moment-timezone');
import { MessageConfig } from '../../entity/config/message-config.entity';
import { Comparator } from '../../enum/comparator.enum';

describe('Message', () => {
  const messageConfig: MessageConfig = {
    id: 1,
    template:
      'Milovice Rádio dobrý den. Čas <#TIME>. Vítr <#WIND>. ' +
      'Dráha v používání <#RWY>. Okruhy <#CIRCUIT>. Teplota <#TEMP>. ' +
      'Základna oblačnosti <#CLOUDBASE>. QNH <#QNH>.',
    timezone: 'Europe/Prague',
    windSpeedUnit: 'uzlů',
    windBearingUnit: 'stupňů',
    windCalm: 'klid',
    windGust: 'Náraz',
    temperatureUnit: 'stupňů',
    cloudBaseUnit: 'stop',
    rwy: [
      { comparator: Comparator.HIGHER_THAN, value: 180, result: '27' },
      { comparator: Comparator.LESS_THAN_OR_EQUAL, value: 180, result: '09' },
    ],
    circuits: [
      { comparator: Comparator.HIGHER_THAN, value: 180, result: 'levé' },
      { comparator: Comparator.LESS_THAN_OR_EQUAL, value: 180, result: 'pravé' },
    ],
  };

  let messageService: MessageService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: 'MomentTimezone',
          useValue: moment.tz,
        },
        MessageService,
      ],
    }).compile();

    messageService = await moduleRef.resolve<MessageService>(MessageService);
  });

  it('runway 09, right circuits, no wind', () => {
    const msg = messageService.composeMessage(
      {
        date: '01/08/2020',
        time: '14:00:54',
        windSpeed: '1.8',
        windGust: '1.8',
        windBearing: '120',
        temperature: '20',
        cloudBase: '3000',
        pressure: '1020',
      },
      messageConfig,
    );
    expect(msg).toEqual(
      '<speak>Milovice Rádio dobrý den. ' +
        'Čas <say-as interpret-as="time" format="hm24Z">12:00 UTC</say-as>. ' +
        'Vítr klid. Dráha v používání <say-as interpret-as="characters">09</say-as>. ' +
        'Okruhy pravé. Teplota <say-as interpret-as="cardinal">20</say-as>' +
        ' stupňů. Základna oblačnosti <say-as interpret-as="cardinal">3000</say-as> stop. ' +
        'QNH <say-as interpret-as="characters">1020</say-as>.</speak>',
    );
  });
  it('runway 27, left circuits, wind no gusts in kts', () => {
    const msg = messageService.composeMessage(
      {
        date: '01/08/2020',
        time: '14:00:54',
        windSpeed: '4.8',
        windGust: '4.8',
        windBearing: '220',
        temperature: '20',
        cloudBase: '3000',
        pressure: '1020',
      },
      messageConfig,
    );
    expect(msg).toBe(
      '<speak>Milovice Rádio dobrý den. ' +
        'Čas <say-as interpret-as="time" format="hm24Z">12:00 UTC</say-as>. ' +
        'Vítr <say-as interpret-as="characters">220</say-as> stupňů ' +
        '<say-as interpret-as="characters">5</say-as> uzlů. ' +
        'Dráha v používání <say-as interpret-as="characters">27</say-as>. Okruhy levé. ' +
        'Teplota <say-as interpret-as="cardinal">20</say-as> stupňů. ' +
        'Základna oblačnosti <say-as interpret-as="cardinal">3000</say-as> stop. ' +
        'QNH <say-as interpret-as="characters">1020</say-as>.</speak>',
    );
  });
  it('runway 27, left circuits, wind with gusts in kts', () => {
    const msg = messageService.composeMessage(
      {
        date: '01/08/2020',
        time: '14:00:54',
        windSpeed: '18.3',
        windGust: '27.8',
        windBearing: '220',
        temperature: '20',
        cloudBase: '3000',
        pressure: '1020',
      },
      messageConfig,
    );
    expect(msg).toBe(
      '<speak>Milovice Rádio dobrý den. ' +
        'Čas <say-as interpret-as="time" format="hm24Z">12:00 UTC</say-as>. ' +
        'Vítr <say-as interpret-as="characters">220</say-as> stupňů ' +
        '<say-as interpret-as="characters">18</say-as> uzlů. ' +
        'Náraz <say-as interpret-as="characters">28</say-as>. ' +
        'Dráha v používání <say-as interpret-as="characters">27</say-as>. Okruhy levé. ' +
        'Teplota <say-as interpret-as="cardinal">20</say-as> stupňů. ' +
        'Základna oblačnosti <say-as interpret-as="cardinal">3000</say-as> stop. ' +
        'QNH <say-as interpret-as="characters">1020</say-as>.</speak>',
    );
  });
  it('prague timezone winter time', () => {
    const msg = messageService.composeMessage(
      {
        date: '01/01/2020',
        time: '14:00:54',
        windSpeed: '4.8',
        windGust: '8.8',
        windBearing: '220',
        temperature: '20',
        cloudBase: '3000',
        pressure: '1020',
      },
      messageConfig,
    );
    expect(msg).toBe(
      '' +
        '<speak>Milovice Rádio dobrý den. Čas <say-as interpret-as="time" format="hm24Z">13:00 UTC</say-as>. ' +
        'Vítr <say-as interpret-as="characters">220</say-as> stupňů ' +
        '<say-as interpret-as="characters">5</say-as> uzlů. ' +
        'Náraz <say-as interpret-as="characters">9</say-as>. Dráha v používání ' +
        '<say-as interpret-as="characters">27</say-as>. ' +
        'Okruhy levé. Teplota <say-as interpret-as="cardinal">20</say-as> stupňů. ' +
        'Základna oblačnosti <say-as interpret-as="cardinal">3000</say-as> stop. ' +
        'QNH <say-as interpret-as="characters">1020</say-as>.</speak>',
    );
  });
  it('prague timezone summer time', () => {
    const msg = messageService.composeMessage(
      {
        date: '01/08/2020',
        time: '14:00:54',
        windSpeed: '4.8',
        windGust: '8.8',
        windBearing: '220',
        temperature: '20',
        cloudBase: '3000',
        pressure: '1020',
      },
      messageConfig,
    );
    expect(msg).toBe(
      '<speak>Milovice Rádio dobrý den. Čas <say-as interpret-as="time" format="hm24Z">12:00 UTC</say-as>. ' +
        'Vítr <say-as interpret-as="characters">220</say-as> stupňů ' +
        '<say-as interpret-as="characters">5</say-as> uzlů. ' +
        'Náraz <say-as interpret-as="characters">9</say-as>. Dráha v používání ' +
        '<say-as interpret-as="characters">27</say-as>. ' +
        'Okruhy levé. Teplota <say-as interpret-as="cardinal">20</say-as> stupňů. ' +
        'Základna oblačnosti <say-as interpret-as="cardinal">3000</say-as> stop. ' +
        'QNH <say-as interpret-as="characters">1020</say-as>.</speak>',
    );
  });
  it('no timezone shift', () => {
    const msg = messageService.composeMessage(
      {
        date: '01/08/2020',
        time: '14:00:54',
        windSpeed: '4.8',
        windGust: '8.8',
        windBearing: '220',
        temperature: '20',
        cloudBase: '3000',
        pressure: '1020',
      },
      Object.assign(messageConfig, { timezone: 'UTC' }),
    );
    expect(msg).toBe(
      '<speak>Milovice Rádio dobrý den. Čas <say-as interpret-as="time" format="hm24Z">14:00 UTC</say-as>. ' +
        'Vítr <say-as interpret-as="characters">220</say-as> stupňů ' +
        '<say-as interpret-as="characters">5</say-as> uzlů. ' +
        'Náraz <say-as interpret-as="characters">9</say-as>. Dráha v používání ' +
        '<say-as interpret-as="characters">27</say-as>. ' +
        'Okruhy levé. Teplota <say-as interpret-as="cardinal">20</say-as> stupňů. ' +
        'Základna oblačnosti <say-as interpret-as="cardinal">3000</say-as> stop. ' +
        'QNH <say-as interpret-as="characters">1020</say-as>.</speak>',
    );
  });
});
