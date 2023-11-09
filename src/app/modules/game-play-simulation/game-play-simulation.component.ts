import { Component, OnInit } from '@angular/core';

import { FootballFieldComponent } from '../football-field/football-field.component';
import * as d3 from 'd3';
import { Observable, Subscription } from 'rxjs';

import Json1 from '../../../assets/json-data/58292_40.json';
import Json2 from '../../../assets/json-data/58292_55.json';
import Json3 from '../../../assets/json-data/58292_76.json';
import Json4 from '../../../assets/json-data/58292_98.json';
import Json5 from '../../../assets/json-data/58292_118.json';
import Json6 from '../../../assets/json-data/58292_134.json';
import Json7 from '../../../assets/json-data/58292_149.json';
import Json8 from '../../../assets/json-data/58292_170.json';
import Json9 from '../../../assets/json-data/58292_190.json';
import { map } from 'rxjs/operators';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-game-play-simulation',
  standalone: true,
  imports: [FootballFieldComponent, NgIf,NgFor],
  templateUrl: './game-play-simulation.component.html',
  styleUrl: './game-play-simulation.component.css',
})
export class GamePlaySimulationComponent implements OnInit {
  PlaysJson1;
  PlaysJson2;
  PlaysJson3;
  PlaysJson4;
  PlaysJson5;
  PlaysJson6;
  PlaysJson7;
  PlaysJson8;
  PlaysJson9;
  PlayMap = new Map();
  GamePlays: any[] = [];
  mergedPlays: any[] = [];
  private myOB: Subscription | undefined;
  //initialize default game play
  SelectedGamePlay: {
    homeTrackingData:  any[];
    awayTrackingData: any[];
    ballTrackingData: any;
  } = {
    homeTrackingData: [],
    awayTrackingData: [],
    ballTrackingData: undefined,
  };

  field = new FootballFieldComponent();
  homeTeamPrimaryColor: string | undefined;
  homeTeamSecondaryColor: string | undefined;
  awayTeamPrimaryColor: string | undefined;
  awayTeamSecondaryColor: string | undefined;
  imageSrcHome: string | undefined;
  imageSrcAway: string | undefined;
  nameHomeTeam: string | undefined;
  nameAwayTeam: string | undefined;
  // svg: any;
  margin = 50;
  width = 1150 - this.margin * 2;
  height = 600 - this.margin * 2;

  svg: any;
  constructor() {
    this.PlaysJson1 = Json1;
    this.PlaysJson2 = Json2;
    this.PlaysJson3 = Json3;
    this.PlaysJson4 = Json4;
    this.PlaysJson5 = Json5;
    this.PlaysJson6 = Json6;
    this.PlaysJson7 = Json7;
    this.PlaysJson8 = Json8;
    this.PlaysJson9 = Json9;
    this.PlaysJson1.name = 'PlaysJson1';
    this.PlaysJson2.name = 'PlaysJson2';
    this.PlaysJson3.name = 'PlaysJson3';
    this.PlaysJson4.name = 'PlaysJson4';
    // this.PlaysJson5.name = 'PlaysJson5';
    this.PlaysJson6.name = 'PlaysJson6';
    this.PlaysJson7.name = 'PlaysJson7';
    this.PlaysJson8.name = 'PlaysJson8';
    this.PlaysJson9.name = 'PlaysJson9';
    //this.SelectedGamePlay = this.PlaysJson4;
    this.GamePlays = [
      this.PlaysJson1,
      this.PlaysJson2,
      this.PlaysJson3,
      this.PlaysJson4,
      this.PlaysJson5,
      this.PlaysJson6,
      this.PlaysJson7,
      this.PlaysJson8,
      this.PlaysJson9,
    ];
    for (let play of this.GamePlays) {
      this.PlayMap.set(play.name, play);
    }
  }

  ngOnInit(): void {
    this.createSvg();
  }
  createSvg() {
    this.svg = d3
      .select('figure#scatter')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')')
      .attr('class', 'football-field-container');
  }

  //Select play event handler
  selectChangeHandler(playName: string) {
    d3.selectAll('ellipse').remove();
    d3.selectAll('circle').remove();
    d3.selectAll('text').remove();
    this.mergedPlays = [];
    this.field.markField(this.svg);
    this.SelectedGamePlay = this.PlayMap.get(playName);

    this.nameHomeTeam = 'Houston';
    this.homeTeamPrimaryColor = 'blue';
    this.homeTeamSecondaryColor = 'white';

    this.nameAwayTeam = 'Jaguar';

    this.awayTeamPrimaryColor = 'red';
    this.awayTeamSecondaryColor = 'white';

    const teamObserver = new Observable((observer) => {
      for (let i = 0; i < this.SelectedGamePlay.homeTrackingData.length; i++) {
        this.SelectedGamePlay.homeTrackingData[i].teamColorPrimary =
          this.homeTeamPrimaryColor;
        this.SelectedGamePlay.homeTrackingData[i].teamColorSecondary =
          this.homeTeamSecondaryColor;
        // this.SelectedGamePlay?.awayTrackingData[i]?.teamColorPrimary =
        //   this.awayTeamPrimaryColor;
        // this.SelectedGamePlay?.awayTrackingData[i].teamColorSecondary =
        //   this.awayTeamSecondaryColor;
        observer.next(this.SelectedGamePlay.homeTrackingData[i]); //Emits next
        observer.next(this.SelectedGamePlay.awayTrackingData[i]); //Emits next
      }
    });
    this.myOB = teamObserver.subscribe((data) => {
      this.mergedPlays.push(data);
      if (this.mergedPlays.length === 22) {
        let counter = 0;
        for (let play of this.mergedPlays) {
          this.drawPlayerPlot(play);
        }
        this.drawBallPlot(this.SelectedGamePlay.ballTrackingData);
      }
    });
  }

  drawPlayerPlot(data: any): void {
    const x = d3.scaleLinear().domain([0, 120]).range([0, this.width]);
    const y = d3.scaleLinear().domain([0, 53.33]).range([this.height, 0]);

    let playerData = data.playerTrackingData;

    let delay = 100;
    const len = playerData.length - 1;
    playerData.jerseyNumber = data.jerseyNumber;

    let allPlayersCirc = this.svg.append('g');
    allPlayersCirc
      .selectAll('circle')
      .data(playerData)
      .enter()
      .append('circle')
      .attr('cx', function (d: { x: d3.NumberValue }) {
        return x(d.x);
      })
      .attr('cy', function (d: { y: d3.NumberValue }) {
        return y(d.y);
      })
      .attr('r', 10)
      .style('visibility', 'hidden')
      .style('fill', data.teamColorPrimary)
      .attr('stroke', data.teamColorSecondary)
      .attr('stroke-width', '3')
      .transition()
      .delay(function (d: any, i: number) {
        return i * delay;
      })
      .duration(100);
    // .on('start', function (d: any, i: number) {
    // 	if (i < len) {
    // 		d3.active(this).style('visibility', 'hidden').remove();
    // 	}
    // 	d3.active(this)
    // 		.attr('cx', (d: { x: d3.NumberValue }) {
    // 			return x(d.x);
    // 		})
    // 		.attr('cy', function (d: { y: d3.NumberValue }) {
    // 			return y(d.y);
    // 		})
    // 		.style('visibility', 'visible');
    // });

    //Add Text
    allPlayersCirc
      .selectAll('text')
      .data(playerData)
      .enter()
      .append('text')
      .text(playerData.jerseyNumber)
      .attr('x', (d: { x: d3.NumberValue }) => x(d.x))
      .attr('y', (d: { y: d3.NumberValue }) => y(d.y))
    //   .attr('transform', (d) => 'translate(' + -7 + ',' + 5 + ')')
      .style('font-size', '12px')
      .style('fill', 'white')
      .style('visibility', 'hidden')
      .transition()
      .delay(function (d: any, i: number) {
        return i * delay;
      })
      .duration(100);
    // .on('start', function (d: any, i: number) {
    // 	if (i < len) {
    // 		d3.active(this).style('visibility', 'hidden').remove();
    // 	}
    // 	d3.active(this)
    // 		.attr('cx', function (d: { x: d3.NumberValue }) {
    // 			return x(d.x);
    // 		})
    // 		.attr('cy', function (d: { y: d3.NumberValue }) {
    // 			return y(d.y);
    // 		})
    // 		.style('visibility', 'visible');
    // });
  }

  drawBallPlot(ballData: string | any[]): void {
    const x = d3.scaleLinear().domain([0, 120]).range([0, this.width]);
    const y = d3.scaleLinear().domain([0, 53.33]).range([this.height, 0]);
    let delay = 100;
    const len = ballData.length - 1;
    let ballCirc = this.svg.append('g');
    ballCirc
      .selectAll('ellipse')
      .data(ballData)
      .enter()
      .append('ellipse')
      .attr('cx', function (d: { x: d3.NumberValue }) {
        return x(d.x);
      })
      .attr('cy', function (d: { y: d3.NumberValue }) {
        return y(d.y);
      })
      .attr('rx', 8)
      .attr('ry', 4.5)
      .style('visibility', 'hidden')
      .style('fill', '#b03404')
      .attr('stroke', 'black')
      .attr('stroke-width', '1')
      .transition()
      .delay(function (d: any, i: number) {
        return i * delay;
      })
      .duration(100);
    // .on('start', function (d: any, i: number) {
    // 	if (i < len) {
    // 		d3.active(this).style('visibility', 'hidden').remove();
    // 	}
    // 	d3.active(this)
    // 		.attr('cx', function (d: { x: d3.NumberValue }) {
    // 			return x(d.x);
    // 		})
    // 		.attr('cy', function (d: { y: d3.NumberValue }) {
    // 			return y(d.y);
    // 		})
    // 		.style('visibility', 'visible');
    // });
  }
}
