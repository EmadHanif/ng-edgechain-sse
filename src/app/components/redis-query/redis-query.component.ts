import { Component, OnInit } from '@angular/core';
import {ChainResponseModel} from '../../models/chain-response.model';
import {SseClient} from 'ngx-sse-client';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-redis-query',
  templateUrl: './redis-query.component.html',
  styleUrls: ['./redis-query.component.css']
})
export class RedisQueryComponent implements OnInit {

  chainResponse: ChainResponseModel[] = [];

  constructor(private sseClient: SseClient) {}

  ngOnInit() {
  }

  onRedisQuery() {

    const topK:number = 10;
    const query:string = "What is the collect stage for data maturity?"
    const path = `${environment.serverPath}/v1/redis/openai/query?topK=${topK}&stream=true&query=${query}`;
    this.sseClient.stream(path, {keepAlive: false,  responseType: 'text'})
      .subscribe((event) => {
        console.log(event)
        const chatResponse = new ChainResponseModel(JSON.parse(event));
        this.chainResponse.push(chatResponse);
      });
  }

}
