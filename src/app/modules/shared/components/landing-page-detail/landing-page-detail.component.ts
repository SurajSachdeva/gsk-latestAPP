import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page-detail',
  templateUrl: './landing-page-detail.component.html',
  styleUrls: ['./landing-page-detail.component.scss'],
  inputs:["approvedCount","approvedPath","pendingCount","pendingPath", "rejectedCount","rejectedPath","activeCard"]
})
export class LandingPageDetailComponent implements OnInit {

  activeCard :"A"| "P" | "R"| undefined;

  approvedCount:number=0;
  approvedPath:string="";

  pendingCount:number=0;
  pendingPath:string="";

  rejectedCount:number=0;
  rejectedPath:string="";

  constructor() { }

  ngOnInit(): void {
  }

}
