import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDisplay } from './output-display';

describe('OutputDisplay', () => {
  let component: OutputDisplay;
  let fixture: ComponentFixture<OutputDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutputDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
