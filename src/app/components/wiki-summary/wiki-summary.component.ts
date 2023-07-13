import { Component, OnInit } from '@angular/core';
import {SseClient} from 'ngx-sse-client';
import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {AppConst} from '../../constants/app.const';
import {Subscription} from 'rxjs';
import {ChatCompletionModel} from '../../models/chat-completion.model';

@Component({
  selector: 'app-wiki-summary',
  templateUrl: './wiki-summary.component.html',
  styleUrls: ['./wiki-summary.component.css']
})
export class WikiSummaryComponent implements OnInit {

  output: string = "";

  constructor(private sseClient: SseClient) {

  }

  ngOnInit() {
  }

  onWikiSummary(){
    const input = "Barack Obama";
    const path = `${environment.serverPath}/v1/examples/wiki-summary?query=${input}`

    this.output =  "";

    const headers = new HttpHeaders().set('Content-Type', `application/json`).set("stream","true");


    const subscription:Subscription = this.sseClient.stream(path, { keepAlive: false, responseType: 'text' }, {headers})
      .subscribe((event) => {
        console.log(event)
        const chatResponse = new ChatCompletionModel(JSON.parse(event));
        if(chatResponse.choices[0].finish_reason !== undefined) subscription.unsubscribe();
        else this.output = this.output.concat(chatResponse.choices[0].message.content );
      });


  }

}
