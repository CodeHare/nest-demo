/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

// Controller 接收 http 请求，抵用 Services, 得到响应
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
// 5.json 和 form urlencoded 都不适合传递文件，想传输文件要用 form data
// form data 是用 -------- 作为 boundary 分隔传输的内容的
// Nest 解析 form data 使用 FilesInterceptor 的拦截器，用 @UseInterceptors 装饰器启用，然后通过 @UploadedFiles 来取。非文件的内容，同样是通过 @Body 来取。
@Controller('api/person')
export class formDataPersonController {
  @Post('file/formData')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    // 这里会报错 命名空间“global.Express”没有已导出的成员“Multer”，故安装一下 npm i -D @types/multer
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return {
      id: 0,
      data: createPersonDto,
      message: 'successful!',
    };
  }
}

// 4.json
// 比起 form urlencoded，使用 json 来传输更常用一些
// json 需要指定 content-type 为 application/json，内容会以 JSON 的方式传输
// 后端代码同样使用 @Body 来接收，不需要做啥变动。form urlencoded 和 json 都是从 body 取值，Nest 内部会根据 content type 做区分，使用不同的解析方式。
@Controller('api/person/json')
export class JsonPersonController {
  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return {
      id: 0,
      data: createPersonDto,
      message: 'successful!',
    };
  }
}

// 3. form urlencoded
// form urlencoded 是通过 body 传输数据，其实是把 query 字符串放在了 body 里，所以需要做 url encode.
// 用 Nest 接收的话，使用 @Body 装饰器，Nest 会解析请求体，然后注入到 dto 中。
// dto 是 data transfer object，就是用于封装传输的数据的对象
@Controller('api/person/formUrlencoded')
export class FormUrlencodedPersonController {
  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return {
      id: 0,
      data: createPersonDto,
      message: 'successful!',
    };
  }
}

// ==> 总结：下面 1 与 2 两种（url param、query）是通过 url 传递数据的方式。
// 2. query
// query 是 url 中 ? 后的字符串，需要做 url encode。在 Nest 里，通过 @Query 装饰器来取。
@Controller('api/person')
export class QueryPersonController {
  @Get('urlQuery')
  query(@Query('name') name: string, @Query('age') age: number) {
    return {
      id: 0,
      data: {
        name: `${name}`,
        age: `${age}`,
      },
      message: 'success',
    };
  }
}

// 1. url param
// url param 是 url 中的参数，Nest 里通过 :参数名 的方式来声明，然后通过 @Param(参数名) 的装饰器取出来注入到 Controller
@Controller('api/person/urlParam')
export class UrlParamPersonController {
  @Get(':urlParam')
  urlParam(@Param('urlParam') urlParam: string) {
    if (urlParam == 'xiaobai') {
      return {
        id: 0,
        data: {
          id: 'baiqingru',
          urlParam: `${urlParam}`,
        },
        message: 'success',
      };
    } else {
      return {
        id: 0,
        data: {
          id: 'null',
          urlParam: `${urlParam}`,
        },
        message: 'failure, this man is not found.',
      };
    }
  }
}
