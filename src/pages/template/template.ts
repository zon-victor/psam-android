import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { TopicsProvider } from '../../providers/topics/topics';

import { 
  StackConfig, 
  // Stack, 
  // Card, 
  // ThrowEvent, 
  // DragEvent, 
  Direction,
  SwingStackComponent, 
  SwingCardComponent } from 'angular2-swing';
  
import * as _ from 'lodash';

import { Section } from './section/section-template';//For the modal which opens when a user clicks the open section button

@IonicPage()
@Component({
  selector: 'page-template',
  templateUrl: 'template.html',
})
export class TemplatePage {

  public _: any = _; 
  public topicID: string = null;
  public topicTitle: string = null;
  public topicDescription: string = null;
  public topicData: string = null;
  public Topic: any; 
  public sections = []; 
  public isections = [];
  public isections_exist: boolean = false;
  public subsections = [];

  public tvet: string  = '#8db86b';
  public wiop:  string  = '#c71f43';
  public he:  string  = '#da264d';
  public isa: string  = '#4c6dd8';
  public sfs:  string  = '#e6864a';
  public entrepreneurship:  string = '#d25f17';

  @ViewChild('myStack') swingStack: SwingStackComponent;
  @ViewChildren('myCard') swingCards: QueryList<SwingCardComponent>;

  stackConfig: StackConfig;

  constructor(
    public navCtrl: NavController, 
    public topic: NavParams, 
    public topicsProvider: TopicsProvider,
    public modalCtrl: ModalController)
    {
      this.topicID = this.topic.get('id');
      this.topicTitle = this.topic.get('title');
      this.topicDescription = this.topic.get('description');
      this.topicData = this.topic.get('data');
      this.loadTopicData(this.topicData)
      this.stackConfig = {
        allowedDirections: [
          Direction.LEFT,
          Direction.DOWN,
          Direction.UP,
          Direction.RIGHT,
        ],
        throwOutConfidence: (offsetX: number, offsetY: number, targetElement: HTMLElement) => {
          // you would put ur logic based on offset & targetelement to determine
          // what is your throwout confidence
          const xConfidence = Math.min(Math.abs(offsetX) / targetElement.offsetWidth, 1);
          const yConfidence = Math.min(Math.abs(offsetY) / targetElement.offsetHeight, 1);

          return Math.max(xConfidence, yConfidence);
        },
        minThrowOutDistance: 8000    // default value is 400
      };
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TemplatePage');
  }

  myArr (arr) {
    return Array.from(arr);
  }

  loadTopicData(datafile: any)
  {
    this.topicsProvider.getTopicData(datafile).subscribe(data => {
      // this.Topic = data;
      // this.sections = data.sections;

      if (data.isections.length > 0) {
        this.isections_exist = true;
        this.prepareISections(data.isections);
      } else {
        this.isections_exist = false;
      }
      this.prepareSections(data.sections);
    });
  }

  prepareSections(sections: any)
  {
    var x = 0;

    for (var i = sections.length - 1; i >= 0; i--)
    {
      this.sections[x] = sections[i];
      x++;
    }
  }

  prepareISections(isections: any)
  {
    for (var i = 0; i < isections.length; i++)
    {
      this.isections[i] = isections[i];
    }
  }

  // For section preview only
  public tag: string;
  public content_heading: string;
  public data_heading: string;
  public data: any;

  setPreviewContent(section: any)
  {
    var subsection_heading = section.subsections[0].subsection_heading;
    var content = section.subsections[0].contents[0];
    this.content_heading = content.content_heading;
    this.data_heading = content.data_heading;
    this.tag = content.tag;
    this.data = content.data

    return true;
  }

  //Open the section in a new window/page
  openSection(section_data)
  {
    let sectionModal = this.modalCtrl.create(Section, { section: section_data });
    sectionModal.present();
  }

  getMargin(i: number, m: number) {
    return i * m + 'px'
  }

  rotateCard()
  {
    return '7deg'
  }

  getColor(topic_id: string){
    let color: string = this.tvet;
    switch (topic_id) {
      case 'tvet':
        color = this.tvet
        break;
        
      case 'wiop':
        color = this.wiop
        break;
        
      case 'he':
        color = this.he
        break;
        
      case 'isa':
        color = this.isa
        break;
        
      case 'sfs':
        color = this.sfs
        break;
        
      case 'entrepreneurship':
        color = this.entrepreneurship
        break;

      default:
        break;
    }

    return color
  }

  isParagraph(el: string): boolean{
    if (el == 'paragraph'){
      return true
    }
    return false
  }

  isList(el: string): boolean{
    if (el == 'list'){
      return true
    }
    return false
  }
}
