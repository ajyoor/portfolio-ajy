import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ProfanityFilterService } from './word-filter.service';

@Module({
  providers: [TokenService, ProfanityFilterService],
  exports: [TokenService, ProfanityFilterService],
})
export class SharedModule {}
