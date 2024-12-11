import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddValoracionComponent } from './add-valoracion.component';

describe('AddValoracionComponent', () => {
  let component: AddValoracionComponent;
  let fixture: ComponentFixture<AddValoracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddValoracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddValoracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
