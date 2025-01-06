import { Module } from '@nestjs/common';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: './logs',
          filename: 'error-%DATE%.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
          maxSize: '20m',
          maxFiles: '5d',
        }),
        new winston.transports.File({
          dirname: './logs',
          filename: 'info-%DATE%.log',
          format: winston.format.json(),
        }),
      ],
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
