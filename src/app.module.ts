import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './modules/blogs/blogs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './core/config/database.config';
import { CategoryModule } from './modules/category/category.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { RateLimiterModule, RateLimiterGuard } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';
import { CommentsModule } from './modules/comments/comments.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BlogsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        typeOrmConfig(configService),
    }),
    CategoryModule,
    UploadsModule,
    CommentsModule,
    SharedModule,
    RateLimiterModule.register({
      for: 'Express',
      type: 'Memory',
      points: 100,
      duration: 60,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class AppModule {}
