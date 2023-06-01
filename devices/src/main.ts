import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Get 请求访问静态资源 public/index.html
  // 1. import { NestExpressApplication } from '@nestjs/platform-express';
  // 2. import { join } from 'path';
  // 3. app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  // 4. 创建 public/index.html

  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  await app.listen(3001);
}
bootstrap();
