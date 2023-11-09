import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as FieldConstants from './football-field.constants';
@Component({
  selector: 'app-football-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './football-field.component.html',
  styleUrl: './football-field.component.css',
})
export class FootballFieldComponent {
  @Input() svg: any;
  @Input() width: any;
  @Input() height: any;
  @Input() margin: any;

  ngOnInit(): void {
    this.createSvg(this.svg);
  }

  //Create svg
  private createSvg(svg: any): void {
    // svg
    // 	.append('g')
    // 	.append('svg:image')
    // 	.attr('xlink:href', '../assets/field.svg')
    // 	.attr('width', 1180)
    // 	.attr('height', 600)
    // 	.attr('x', -30)
    // 	.attr('y', -30)
    // 	.style('opacity', 1);

    //footballField
    svg
      .append('g')
      .append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', '#036602')
      // .attr('rx', 6)
      // .attr('ry', 6)
      .attr('x', -2)
      .attr('y', 1)
      .attr('width', FieldConstants.FootballFieldWidth)
      .attr('height', FieldConstants.FootballFieldheight)
      .attr('stroke', 'white')
      .attr('stroke-width', '0.6rem');

    //Draw goal posts
    this.drawGoalPost(
      FieldConstants.leftTopGPX1,
      FieldConstants.leftTopGPX2,
      FieldConstants.leftTopGPY1,
      FieldConstants.leftTopGPY2
    );
    this.drawGoalPost(
      FieldConstants.leftBottomGPX1,
      FieldConstants.leftBottomGPX2,
      FieldConstants.leftBottomGPY1,
      FieldConstants.leftBottomGPY2
    );
    this.drawGoalPost(
      FieldConstants.rightTopGPX1,
      FieldConstants.rightTopGPX2,
      FieldConstants.rightTopGPY1,
      FieldConstants.rightTopGPY2
    );
    this.drawGoalPost(
      FieldConstants.rightBottomGPX1,
      FieldConstants.rightBottomGPX2,
      FieldConstants.rightBottomGPY1,
      FieldConstants.rightBottomGPY2
    );

    //Field Goal Post
    this.drawFieldGoalSpot(
      FieldConstants.leftFieldGoalX1,
      FieldConstants.leftFieldGoalX2,
      FieldConstants.leftFieldGoalY1,
      FieldConstants.leftFieldGoalY2
    );
    this.drawFieldGoalSpot(
      FieldConstants.rightFieldGoalX1,
      FieldConstants.rightFieldGoalX2,
      FieldConstants.rightFieldGoalY1,
      FieldConstants.rightFieldGoalY2
    );
    //Draw Hash Marks and Yard Lines
    this.drawHashMarksYardLines(
      FieldConstants.topHashmarkY1,
      FieldConstants.topHashmarkY2
    );
    this.drawHashMarksYardLines(
      FieldConstants.topMiddleHashmarkY1,
      FieldConstants.topMiddleHashmarkY2
    );
    this.drawHashMarksYardLines(
      FieldConstants.bottomMiddleHashmarkY1,
      FieldConstants.bottomMiddleHashmarkY2
    );
    this.drawHashMarksYardLines(
      FieldConstants.bottomHashmarkY1,
      FieldConstants.bottomHashmarkY2
    );

    //Texans Logo
    svg
      .append('g')
      .append('svg:image')
      .attr('xlink:href', 'assets/tx.png')
      .attr('class', 'football-field-logo')
      .attr('width', FieldConstants.logoWidth)
      .attr('height', FieldConstants.logoWidth)
      .attr('x', FieldConstants.logoX)
      .attr('y', FieldConstants.logoY)
    

    this.markField(svg);
  }
  drawGoalPost(x1: number, x2: number, y1: number, y2: number) {
    this.svg
      .append('g')
      .append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .style('stroke', 'white')
      .attr('stroke-width', '.3rem');
  }
  drawFieldGoalSpot(x1: number, x2: number, y1: number, y2: number) {
    this.svg
      .append('g')
      .append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .style('stroke', 'white')
      .attr('stroke-width', '.15rem');
  }
  drawHashMarksYardLines(y1: number, y2: number) {
    //Texans Lines
    for (
      let yardLineX = FieldConstants.yardLinesStartingX;
      yardLineX <= FieldConstants.yardLinesEndingX;
      yardLineX += FieldConstants.distanceBtYardLines
    ) {
      this.svg
        .append('g')
        .append('line')
        .attr('x1', yardLineX)
        .attr('y1', FieldConstants.yardLinesY1)
        .attr('x2', yardLineX)
        .attr('y2', FieldConstants.yardLinesY2)
        .style('stroke', 'white')
        .attr('stroke-width', '0.15rem');
      let j = yardLineX + FieldConstants.OffsetFromYardline;
      //Texans Lines
      if (yardLineX < FieldConstants.lastXhashmark) {
        for (
          let xx = j;
          xx <= j + FieldConstants.lastXhashmarkBfYrdLn;
          xx += FieldConstants.distanceBtHashMarks
        ) {
          this.svg
            .append('g')
            .append('line')
            .attr('x1', xx)
            .attr('y1', y1)
            .attr('x2', xx)
            .attr('y2', y2)
            .style('stroke', 'white')
            .attr('stroke-width', '0.15rem');
        }
      }
    }
  }
  public markField(svg: any) {
    this.setTexans(
      FieldConstants.leftTexansX,
      FieldConstants.leftTexansY,
      FieldConstants.leftTexansRotation,
      svg
    );
    this.setTexans(
      FieldConstants.rightTexansX,
      FieldConstants.rightTexansY,
      FieldConstants.rightTexansRotation,
      svg
    );

    //Set number 10
    this.setTens(
      FieldConstants.topLeft10X,
      FieldConstants.topLeft10Y,
      FieldConstants.topLeft10Rotations,
      svg
    );
    this.setTens(
      FieldConstants.topRightt10X,
      FieldConstants.topRightt10Y,
      FieldConstants.topRightt10Rotations,
      svg
    );
    this.setTens(
      FieldConstants.bottomLeft10X,
      FieldConstants.bottomLeft10Y,
      FieldConstants.bottomLeft10Rotations,
      svg
    );
    this.setTens(
      FieldConstants.bottomRightt10X,
      FieldConstants.bottomRightt10Y,
      FieldConstants.bottomRightt10Rotations,
      svg
    );
    //Set other numbers

    let xt = FieldConstants.topNumbersStartingX;
    let xb = FieldConstants.bottomNumbersStartingX;
    for (let n of FieldConstants.yardNumbers) {
      this.setFieldNumbers(
        n.toString(),
        xt,
        FieldConstants.topNumbersY,
        FieldConstants.topNumbersRotations,
        svg
      );
      this.setFieldNumbers(
        n.toString(),
        xb,
        FieldConstants.bottomNumbersY,
        FieldConstants.bottomNumbersRotations,
        svg
      );

      xt -= FieldConstants.distanceBtNumbers;
      xb += FieldConstants.distanceBtNumbers;
    }
    //Set arrows
    xt = FieldConstants.topArrowX;
    xb = FieldConstants.bottomArrowX;
    for (let i = 0; i < 4; i++) {
      this.setFieldArrows(
        xt,
        FieldConstants.topLeftArrowY,
        FieldConstants.topLeftArrowRotation,
        FieldConstants.arrow,
        svg
      );
      this.setFieldArrows(
        xt,
        FieldConstants.topRightArrowY,
        FieldConstants.topRightArrowRotation,
        FieldConstants.arrow,
        svg
      );
      this.setFieldArrows(
        xb,
        FieldConstants.bottomLeftArrowY,
        FieldConstants.bottomLeftArrowRotation,
        FieldConstants.arrow,
        svg
      );
      this.setFieldArrows(
        xb,
        FieldConstants.bottomRightArrowY,
        FieldConstants.bottomRightArrowRotation,
        FieldConstants.arrow,
        svg
      );
      xt -= FieldConstants.distanceBtNumbers;
      xb += FieldConstants.distanceBtNumbers;
    }
  }

  setTexans(x: number, y: number, r: number, svg: any) {
    //Add Texans text
    svg
      .append('text')
      .style('fill', 'white')
      .text(() => 'TEXANS')
      .attr('transform', `rotate(${r})`)
      .attr('x', x)
      .attr('y', y)
      .style('font-family', 'TexFont')
      .style('font-size', '40px')
      .attr('stroke', '#03202F')
      .attr('stroke-width', '0.2rem');
  }
  //Set 10s
  setTens(x: number, y: number, r: number, svg: any) {
    let arrow = 'Unicode Character';
    svg
      .append('text')
      .style('fill', 'white')
      .text(() => '10')
      .attr('transform', `rotate(${r})`)
      .attr('x', x)
      .attr('y', y)
      .style('font-family', 'Klavika')
      .style('font-kerning', 'auto')
      .style('font-weight', '600')
      .style('font-size', '2.3rem');
  }
  //Set the other numbers
  setFieldArrows(x: number, y: number, r: number, arrow: string, svg: any) {
    svg
      .append('text')
      .style('fill', 'white')
      .text(() => arrow)
      .attr('transform', `rotate(${r})`)
      .attr('x', x)
      .attr('y', y)
      .style('font-family', 'Klavika')
      .style('font-kerning', 'auto')
      .style('font-weight', '600')
      .style('font-size', '2.3rem');
  }
  //Set the arrows
  setFieldNumbers(n: string, x: number, y: number, r: number, svg: any) {
    svg
      .append('text')
      .style('fill', 'white')
      .text(() => n)
      .attr('transform', `rotate(${r})`)
      .attr('x', x)
      .attr('y', y)
      .style('font-family', 'Klavika')
      .style('font-kerning', 'auto')
      .style('font-weight', '600')
      .style('font-size', '2.3rem');
  }
}
