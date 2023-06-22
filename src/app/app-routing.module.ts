import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WikiSummaryComponent} from './components/wiki-summary/wiki-summary.component';
import {PineconeQueryComponent} from './components/pinecone-query/pinecone-query.component';
import {PineconeChatComponent} from './components/pinecone-chat/pinecone-chat.component';
import {RedisChatComponent} from './components/redis-chat/redis-chat.component';
import {RedisQueryComponent} from './components/redis-query/redis-query.component';

const routes: Routes = [

  {path: "", redirectTo: "/wiki-summary", pathMatch:"full"},
  {path: "wiki-summary", component: WikiSummaryComponent},
  {path: "pinecone-query", component: PineconeQueryComponent},
  {path: "pinecone-chat", component: PineconeChatComponent},
  {path: "redis-query", component: RedisQueryComponent},
  {path: "redis-chat", component: RedisChatComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
