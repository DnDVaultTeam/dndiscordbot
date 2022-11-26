import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DiscordModule } from '@discord-nestjs/core';

import { BotGateway } from './bot/bot.gateway';
import { DiscordConfigService } from './config/discord-config.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    PrismaService,
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      useClass: DiscordConfigService,
    }),
  ],
  providers: [BotGateway],
})
export class AppModule {}
