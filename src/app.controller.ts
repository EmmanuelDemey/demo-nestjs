import { Get, Controller, Param, HttpServer, HttpService } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

export interface SayHelloResponse {
  message: String
} 

export interface Gare {
  name: String;
  id: String
}
export type Gares = Gare[]

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/sayHello/:name")
  root(@Param("name") nom: String = "World"): SayHelloResponse {
    return {message: this.appService.root(nom)}
  }

  @Get("/stations/:stationName")
  getStations(@Param("stationName") stationName: String): Observable<AxiosResponse<Gares>> {
    return this.appService.get(stationName)
    .pipe(
      map((val: AxiosResponse) => val.data.places.map(({id, name}) => ({id, name})))
    )
  }
}
