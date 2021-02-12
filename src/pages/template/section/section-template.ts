import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-section-template',
    templateUrl: 'section-template.html'
})
export class Section {
    section_heading;
    subsections;
    constructor(public params: NavParams, public viewCtrl: ViewController) {
        var section = this.params.get('section');
        this.makeSectionTemplate(section);
    }

    closeSection() {
        this.viewCtrl.dismiss();
    }

    makeSectionTemplate(section) {
        this.section_heading = section.section_heading;
        this.subsections = section.subsections;
    }
}