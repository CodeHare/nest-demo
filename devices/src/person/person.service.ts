import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

// Services 对象是实现业务逻辑
// Repository 对象：实现对数据库的增删改查
// 数据库链接对象 DataSource，配置对象 Config
@Injectable()
export class PersonService {
  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
