import { Component, OnInit } from '@angular/core';
import {SseClient} from 'ngx-sse-client';
import {ChainResponseModel} from '../../models/chain-response.model';
import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {AppConst} from '../../constants/app.const';
import {Subscription} from 'rxjs';

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
    const path = `${environment.serverPath}/v1/sse/wiki/summary?query=${input}`

    this.output =  "";
    const subscription:Subscription = this.sseClient.stream(path, { keepAlive: false, responseType: 'text' })
      .subscribe((event) => {
        console.log(event)
        const chatResponse = new ChainResponseModel(JSON.parse(event));
        if(chatResponse.response === AppConst.CHAT_STREAM_EVENT_COMPLETION_MESSAGE) subscription.unsubscribe();
        else this.output = this.output.concat(chatResponse.response);
      });


  }

}
