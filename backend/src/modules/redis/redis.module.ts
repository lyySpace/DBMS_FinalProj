import { Module } from '@nestjs/common';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const url = process.env.REDIS_URL;

        if (!url) {
          throw new Error('REDIS_URL is not defined');
        }

        return new Redis(url);
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
