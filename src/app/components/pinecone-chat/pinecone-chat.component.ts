import { Component, OnInit } from '@angular/core';
import {SseClient} from 'ngx-sse-client';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {AppConst} from '../../constants/app.const';
import {HttpHeaders} from '@angular/common/http';
import {ChatCompletionModel} from '../../models/chat-completion.model';

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

    const contextId = "historycontext:49a4ffae-9832-4f4c-abe5-35ac00b6c114";
    const namespace = "machine-learning";

    const headers = new HttpHeaders().set('Content-Type', `application/json`).set("stream","true");

    const body = {
      "query": this.input
    }

    const path = `${environment.serverPath}/v1/examples/pinecone/openai/chat?namespace=${namespace}&id=${contextId}`

    this.output = "";
    const subscription: Subscription = this.sseClient.stream(path, {keepAlive: false, responseType: 'text'}, {headers,body})
      .subscribe((event) => {
        // console.log(event)
        console.log(event)
        const chatResponse = new ChatCompletionModel(JSON.parse(event));
        if(chatResponse.choices[0].finish_reason !== undefined) subscription.unsubscribe();
        else this.output = this.output.concat(chatResponse.choices[0].message.content );

      }, error =>  {console.log(error)}, () => {console.log("Hello World")});

  }
}
