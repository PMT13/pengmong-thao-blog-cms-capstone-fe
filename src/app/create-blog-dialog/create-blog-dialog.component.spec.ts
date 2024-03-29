import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlogDialogComponent } from './create-blog-dialog.component';

describe('CreateBlogDialogComponent', () => {
  let component: CreateBlogDialogComponent;
  let fixture: ComponentFixture<CreateBlogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBlogDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBlogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
