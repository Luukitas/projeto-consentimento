import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsentsComponent } from './list-consents.component';

describe('ListConsentsComponent', () => {
  let component: ListConsentsComponent;
  let fixture: ComponentFixture<ListConsentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListConsentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConsentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
