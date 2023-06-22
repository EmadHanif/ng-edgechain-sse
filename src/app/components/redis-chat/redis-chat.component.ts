import { Component, OnInit } from '@angular/core';
import {SseClient} from 'ngx-sse-client';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {ChainResponseModel} from '../../models/chain-response.model';
import {AppConst} from '../../constants/app.const';

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

    const contextId = "historycontext-c79e8f47-88c0-45ae-ac29-00b19c3d08db";
    const path = `${environment.serverPath}/v1/sse/redis/openai/query/context/${contextId}?query=${this.input}`

    this.output = "";
    const subscription: Subscription = this.sseClient.stream(path, {keepAlive: false, responseType: 'text'})
      .subscribe((event) => {
        // console.log(event)
        const chatResponse = new ChainResponseModel(JSON.parse(event));

        if(chatResponse.response === AppConst.CHAT_STREAM_EVENT_COMPLETION_MESSAGE) subscription.unsubscribe();
        else this.output = this.output.concat(chatResponse.response);

      }, error =>  {console.log(error)}, () => {console.log("Hello World")});

  }

}
