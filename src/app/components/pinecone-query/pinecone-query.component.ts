import { Component, OnInit } from '@angular/core';
import {SseClient} from 'ngx-sse-client';
import {environment} from '../../../environments/environment';
import {ChainResponseModel} from '../../models/chain-response.model';

@Component({
  selector: 'app-pinecone-query',
  templateUrl: './pinecone-query.component.html',
  styleUrls: ['./pinecone-query.component.css']
})
export class PineconeQueryComponent implements OnInit {

  chainResponse: ChainResponseModel[] = [];

  constructor(private sseClient: SseClient) {}

  ngOnInit() {
  }

  onPineconeQuery() {
    const topK:number = 10;
    const query:string = "What is the collect stage for data maturity?"
    const path = `${environment.serverPath}/v1/pinecone/openai/query?topK=${topK}&stream=true&query=${query}`;
    this.sseClient.stream(path, {keepAlive: false,  responseType: 'text'})
      .subscribe((event) => {
        console.log(event)
        const chatResponse = new ChainResponseModel(JSON.parse(event));
        this.chainResponse.push(chatResponse);
      });
  }

}
