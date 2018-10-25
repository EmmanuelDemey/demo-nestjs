import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService){}
  root(nom: String): string {
    return `Hello ${nom}!`;
  }

  get(stationName: String): Observable<AxiosResponse> {
     return this.httpService.get(`https://api.sncf.com/v1/coverage/sncf/places?q=${stationName}&type[]=stop_area`, {
      auth: {
        username: 'abe79b6a-5c44-4367-857f-0572ab770582',
        password: ''
      },
    })
  }
}
