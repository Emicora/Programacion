import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesinregComponent } from './homesinreg.component';

describe('HomesinregComponent', () => {
  let component: HomesinregComponent;
  let fixture: ComponentFixture<HomesinregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomesinregComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomesinregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
