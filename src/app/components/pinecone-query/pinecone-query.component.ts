import { Component, OnInit } from '@angular/core';
import {SseClient} from 'ngx-sse-client';
import {environment} from '../../../environments/environment';
import {ChatCompletionModel} from '../../models/chat-completion.model';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-pinecone-query',
  templateUrl: './pinecone-query.component.html',
  styleUrls: ['./pinecone-query.component.css']
})
export class PineconeQueryComponent implements OnInit {

  chatCompletion: ChatCompletionModel[] = [];

  constructor(private sseClient: SseClient) {}

  ngOnInit() {
  }

  onPineconeQuery() {
    const topK:number = 10;
    const input: string = "What is the collect stage for dataset?"

    const path = `${environment.serverPath}/v1/examples/pinecone/openai/query?topK=${topK}&input=${input}&namespace=machine-learning`;
    const headers = new HttpHeaders().set('Content-Type', `application/json`).set("stream","true");

    this.sseClient.stream(path, {keepAlive: false,  responseType: 'text'}, {headers})
      .subscribe((event) => {
        console.log(event)
        const chatResponse = new ChatCompletionModel(JSON.parse(event));
        this.chatCompletion.push(chatResponse);
      });
  }

}
