import { Component, OnInit } from '@angular/core';
import {SseClient} from 'ngx-sse-client';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {AppConst} from '../../constants/app.const';
import {HttpHeaders} from '@angular/common/http';
import {ChatCompletionModel} from '../../models/chat-completion.model';

@Component({
  selector: 'app-redis-chat',
  templateUrl: './redis-chat.component.html',
  styleUrls: ['./redis-chat.component.css']
})
export class RedisChatComponent implements OnInit {

  input:string;

  output: string = "";

  constructor(private sseClient: SseClient) {

  }

  ngOnInit() {
  }

  onRedisChat() {
    const contextId = "historycontext:5d2ff109-5ede-43e9-b415-7d19c45ca2d5";
    const namespace = "machine-learning";

    const headers = new HttpHeaders().set('Content-Type', `application/json`).set("stream","true");

    // localhost:8080/v1/examples/redis/openai/chat?query=So, can you explain the difference between neural network and data science?&namespace=machine-learning&contextId=historycontext-06c48266-2233-4376-b586-052604e478d2

    const path = `${environment.serverPath}/v1/examples/redis/openai/chat?query=${this.input}&namespace=${namespace}&id=${contextId}`

    this.output = "";
    const subscription: Subscription = this.sseClient.stream(path, {keepAlive: false, responseType: 'text'}, {headers})
      .subscribe((event) => {
        // console.log(event)
        console.log(event)
        const chatResponse = new ChatCompletionModel(JSON.parse(event));
        if(chatResponse.choices[0].finish_reason !== undefined) subscription.unsubscribe();
        else this.output = this.output.concat(chatResponse.choices[0].message.content );

      }, error =>  {console.log(error)}, () => {console.log("Hello World")});

  }

}
