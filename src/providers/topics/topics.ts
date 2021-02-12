import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the TopicsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TopicsProvider {

  public topicsFile: string = 'assets/datafiles/topics.json';
  public path: string = 'assets/datafiles/topics/';
  public topicData: string;
  
  constructor(public http: HttpClient) {}

  public getTopics(): Observable<any> {
    return this.http.get(this.topicsFile)
  }

  public getTopicData(datafile: string): Observable<any> {
    this.topicData = this.path + datafile
    return this.http.get(this.topicData)
  }

}
