import { Injectable, Logger } from '@nestjs/common';

import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Client, Message } from 'discord.js';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageCreate')
  async onMessage(message: Message): Promise<void> {
    if (!message.author.bot) {
      await message.reply(
        'Never gonna Beep you Boop\nhttps://media.tenor.com/nBt6RZkFJh8AAAAi/never-gonna.gif'
      );
    }
  }
}
