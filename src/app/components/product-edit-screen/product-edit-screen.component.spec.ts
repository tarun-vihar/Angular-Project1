import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditScreenComponent } from './product-edit-screen.component';

describe('ProductEditScreenComponent', () => {
  let component: ProductEditScreenComponent;
  let fixture: ComponentFixture<ProductEditScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
