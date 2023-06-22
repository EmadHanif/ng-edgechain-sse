import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
// import { SSE } from 'sse.js';

@Injectable({
  providedIn: 'root'
})
export class EventSourceService {

  private createEventSource(path: string): EventSource {
    return new EventSource(path);
  }


  getServerSentEvent<R>(path: string, converter: (data: string) => R = _.identity): Observable<R> {
    return new Observable(observer => {

      const eventSource = this.createEventSource(path);

      eventSource.onmessage = event => {
        observer.next(converter(event.data));
      };
      eventSource.onerror = () => {
        if (eventSource.readyState !== eventSource.CONNECTING) {
          observer.error('An error occurred.');
        }
        eventSource.close();
        observer.complete();
      };
      return () => {
        eventSource.close();
      };
    });
  }
  //
  // postServerSentEvent<R>(path: string, body: any, converter: (data: string) => R = _.identity): Observable<R> {
  //   return new Observable(observer => {
  //     const eventSource = this.postEventSource(path,body);
  //     eventSource.onmessage = event => {
  //       observer.next(converter(event.data));
  //     };
  //     eventSource.onerror = () => {
  //       if (eventSource.readyState !== eventSource.CONNECTING) {
  //         observer.error('An error occurred.');
  //       }
  //       eventSource.close();
  //       observer.complete();
  //     };
  //     return () => {
  //       eventSource.close();
  //     };
  //   });
  // }


  private buildOptions(
    meth: string,
    body: any,
  ): {
    payload: any;
    method: string;
    headers?: string | { Authorization: string };
  } {
    return {
      payload: body,
      method: meth,
    };
  }



}
