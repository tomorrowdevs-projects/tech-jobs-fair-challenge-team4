import { Test, TestingModule } from '@nestjs/testing';
import { ContactsrolesService } from './contactsroles.service';

describe('ContactsrolesService', () => {
  let service: ContactsrolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsrolesService],
    }).compile();

    service = module.get<ContactsrolesService>(ContactsrolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
