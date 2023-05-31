import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatteryModule } from './battery/battery.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [BatteryModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
