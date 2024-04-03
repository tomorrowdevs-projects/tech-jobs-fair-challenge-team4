import { Test, TestingModule } from '@nestjs/testing';
import { ContactsrolesController } from './contactsroles.controller';
import { ContactsrolesService } from './contactsroles.service';

describe('ContactsrolesController', () => {
  let controller: ContactsrolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsrolesController],
      providers: [ContactsrolesService],
    }).compile();

    controller = module.get<ContactsrolesController>(ContactsrolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
