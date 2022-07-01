import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceResultsToolComponent } from './race-results-tool.component';

describe('RaceResultsToolComponent', () => {
  let component: RaceResultsToolComponent;
  let fixture: ComponentFixture<RaceResultsToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceResultsToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceResultsToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
