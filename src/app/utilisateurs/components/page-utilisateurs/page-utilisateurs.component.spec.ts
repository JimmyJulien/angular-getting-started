import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUtilisateursComponent } from './page-utilisateurs.component';

describe('PageUtilisateursComponent', () => {
  let component: PageUtilisateursComponent;
  let fixture: ComponentFixture<PageUtilisateursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageUtilisateursComponent]
    });
    fixture = TestBed.createComponent(PageUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
