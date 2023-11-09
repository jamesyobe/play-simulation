import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlaySimulationComponent } from './game-play-simulation.component';

describe('GamePlaySimulationComponent', () => {
  let component: GamePlaySimulationComponent;
  let fixture: ComponentFixture<GamePlaySimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePlaySimulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamePlaySimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
