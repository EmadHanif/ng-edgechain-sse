import { Component, OnInit } from '@angular/core';
import {SseClient} from 'ngx-sse-client';
import {environment} from '../../../environments/environment';
import {ChainResponseModel} from '../../models/chain-response.model';
import {Subscription} from 'rxjs';
import {AppConst} from '../../constants/app.const';

@Component({
  selector: 'app-pinecone-chat',
  templateUrl: './pinecone-chat.component.html',
  styleUrls: ['./pinecone-chat.component.css']
})
export class PineconeChatComponent implements OnInit {

  input:string;

  output: string = "";

  constructor(private sseClient: SseClient) {

  }

  ngOnInit() {
  }

  onPineconeChat() {
    const contextId = "historycontext-6916fd36-6e56-4af8-8387-50b96479dfad";
    const topK = 7;
    const path = `${environment.serverPath}/v1/pinecone/openai/query/context?contextId=${contextId}&topK=${topK}&stream=true&query=${this.input}`

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
