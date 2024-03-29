import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBlogComponent } from './full-blog.component';

describe('FullBlogComponent', () => {
  let component: FullBlogComponent;
  let fixture: ComponentFixture<FullBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
