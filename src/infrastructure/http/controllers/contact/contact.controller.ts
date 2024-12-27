import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Pagination,
  PaginationParams,
} from '@common/decorators/pagination.decorator';
import {
  CreateContactUseCase,
  DeleteContactUseCase,
  GetAllContactsUseCase,
  GetContactByIdUseCase,
  UpdateContactUseCase,
} from '@app/application/crm/use-case/contact';
import { Auth } from '@common/decorators/auth.decorator';
import { CreateContactDto, UpdateContactDto } from '../../dto/contact';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {
  constructor(
    private readonly getAllContactsUseCase: GetAllContactsUseCase,
    private readonly getContactByIdUseCase: GetContactByIdUseCase,
    private readonly createContactUseCase: CreateContactUseCase,
    private readonly updateContactUseCase: UpdateContactUseCase,
    private readonly deleteContactUseCase: DeleteContactUseCase,
  ) {}

  @Get()
  async getAll(@Pagination() { limit, page }: PaginationParams) {
    return await this.getAllContactsUseCase.execute(limit, page);
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.getContactByIdUseCase.execute(id);
  }

  @Post()
  @Auth()
  @ApiBearerAuth()
  async create(@Body() createDto: CreateContactDto) {
    return await this.createContactUseCase.execute(createDto);
  }

  @Patch(':id')
  @Auth()
  @ApiBearerAuth()
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDto: UpdateContactDto,
  ) {
    return await this.updateContactUseCase.execute({ id, contact: updateDto });
  }

  @Delete(':id')
  @Auth()
  @ApiBearerAuth()
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.deleteContactUseCase.execute(id);
  }
}
