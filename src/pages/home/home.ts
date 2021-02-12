import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { TopicsProvider } from '../../providers/topics/topics';
import * as _ from 'lodash';

import { TemplatePage } from '../template/template';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public _: any = _;
  public topics: string;

  constructor(public navCtrl: NavController, public topicsProvider: TopicsProvider, public topicOptions: ActionSheetController) {

  }

  ngOnInit(){
    this.topicsProvider.getTopics().subscribe(data => {
         this.topics = data
     });
  }

  presentTopicOptions(title: string) {
    let topicOption = this.topicOptions.create({
      title: title,
      buttons: [
        {
          text: 'Frequently Asked Questions',
          handler: () => {
            console.log('FAQS');
          }
        },{
          text: 'Abbreviations',
          handler: () => {
            console.log('Abbreviations');
          }
        },{
          text: 'Ask Questions',
          handler: () => {
            console.log('Ask Questions');
          }
        },{
          text: 'Open this topic',
          handler: () => {
            console.log('Ask Questions');
          }
        },{
          text: 'Search this topic',
          handler: () => {
            console.log('Ask Questions');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    topicOption.present();
  }

  openTopic(topic: any) {
    this.navCtrl.setRoot(TemplatePage, topic)
  }

}
