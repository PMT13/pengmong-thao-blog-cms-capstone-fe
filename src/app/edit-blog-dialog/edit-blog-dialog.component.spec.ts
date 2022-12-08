import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlogDialogComponent } from './edit-blog-dialog.component';

describe('EditBlogDialogComponent', () => {
  let component: EditBlogDialogComponent;
  let fixture: ComponentFixture<EditBlogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBlogDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBlogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
