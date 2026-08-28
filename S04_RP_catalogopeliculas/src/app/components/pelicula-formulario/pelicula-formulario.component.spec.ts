import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaFormularioComponent } from './pelicula-formulario.component';

describe('PeliculaFormularioComponent', () => {
  let component: PeliculaFormularioComponent;
  let fixture: ComponentFixture<PeliculaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
