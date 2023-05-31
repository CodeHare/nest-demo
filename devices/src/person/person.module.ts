import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import {
  PersonController,
  UrlParamPersonController,
  QueryPersonController,
  FormUrlencodedPersonController,
  JsonPersonController,
  formDataPersonController,
} from './person.controller';

@Module({
  controllers: [
    PersonController,
    UrlParamPersonController,
    QueryPersonController,
    FormUrlencodedPersonController,
    JsonPersonController,
    formDataPersonController,
  ],
  providers: [PersonService],
})
export class PersonModule {}
