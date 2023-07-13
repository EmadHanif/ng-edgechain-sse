import { Component, OnInit } from '@angular/core';
import {SseClient} from 'ngx-sse-client';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';
import {ChatCompletionModel} from '../../models/chat-completion.model';

@Component({
  selector: 'app-postgres-chat',
  templateUrl: './postgres-chat.component.html',
  styleUrls: ['./postgres-chat.component.css']
})
export class PostgresChatComponent implements OnInit {
  input:string;

  output: string = "";

  constructor(private sseClient: SseClient) {

  }

  ngOnInit() {
  }

  onPostgresChat() {

    const contextId = "historycontext:5d2ff109-5ede-43e9-b415-7d19c45ca2d5";
    const table = "spring_vectors";

    const headers = new HttpHeaders().set('Content-Type', `application/json`).set("stream","true");

    const path = `${environment.serverPath}/v1/examples/postgres/openai/chat?query=${this.input}&table=${table}&id=${contextId}`

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
