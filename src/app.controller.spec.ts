import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

class MockAppService {
  root(name: String): String{
    return name
  }
  get(stationName: String): Observable<AxiosResponse>{
    return null
  }
}
describe('AppController', () => {
  let app: TestingModule;
  let appController;
  let appService
  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{provide: AppService, useClass: MockAppService}],
    }).compile();
    appService = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "World"', () => {
      expect(appController.root()).toEqual({"message": "World"});
    });
    it('should return "Zenika"', () => {
      expect(appController.root("Zenika")).toEqual({"message": "Zenika"});
    });
  });
});
