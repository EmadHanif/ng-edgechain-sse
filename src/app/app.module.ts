import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { WikiSummaryComponent } from './components/wiki-summary/wiki-summary.component';
import {AppRoutingModule} from './app-routing.module';
import { PineconeQueryComponent } from './components/pinecone-query/pinecone-query.component';
import { PineconeChatComponent } from './components/pinecone-chat/pinecone-chat.component';
import {FormsModule} from '@angular/forms';
import { RedisChatComponent } from './components/redis-chat/redis-chat.component';
import { RedisQueryComponent } from './components/redis-query/redis-query.component';

@NgModule({
  declarations: [
    AppComponent,
    WikiSummaryComponent,
    PineconeQueryComponent,
    PineconeChatComponent,
    RedisChatComponent,
    RedisQueryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
