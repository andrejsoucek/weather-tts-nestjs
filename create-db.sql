CREATE TABLE "daily_stats" ("dayTimestamp" integer PRIMARY KEY NOT NULL, "messagesCount" integer NOT NULL DEFAULT (0), "charactersCount" integer NOT NULL DEFAULT (0));
CREATE TABLE "input_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "gpioInputPin" integer NOT NULL, "porcupineAccessKey" varchar NOT NULL, "ppnFilePath" varchar NOT NULL, "sensitivity" real NOT NULL, "device" varchar NOT NULL);
CREATE TABLE "message_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "template" varchar NOT NULL, "timezone" varchar NOT NULL, "windSpeedUnit" varchar NOT NULL, "windBearingUnit" varchar NOT NULL, "windCalm" varchar NOT NULL, "windGust" varchar NOT NULL, "temperatureUnit" varchar NOT NULL, "cloudBaseUnit" varchar NOT NULL, "rwy" varchar NOT NULL, "circuits" varchar NOT NULL);
CREATE TABLE "output_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "gpioOutputPin" integer NOT NULL);
CREATE TABLE "tts_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "language" varchar NOT NULL);
CREATE TABLE "weather_data_config" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar NOT NULL);
INSERT INTO input_config (id, gpioInputPin, porcupineAccessKey, ppnFilePath, sensitivity, device) VALUES (1, 3, '', 'automated_weather.ppn', 0.65, '');
INSERT INTO message_config (id, template, timezone, windSpeedUnit, windBearingUnit, windCalm, windGust, temperatureUnit, cloudBaseUnit, rwy, circuits) VALUES (1, '', '', '', '', '', '', '', '', '[{"result":"27","comparator":">","value":180},{"result":"09","comparator":"<=","value":180}]', '[{"result":"left hand","comparator":">","value":180},{"result":"right hand","comparator":"<=","value":180}]');
INSERT INTO output_config (id, gpioOutputPin) VALUES (1, 4);
INSERT INTO tts_config (id, language) VALUES (1, '');
INSERT INTO weather_data_config (id, url) VALUES (1, '');