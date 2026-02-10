import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router'; // Nécessaire car AppComponent contient <router-outlet>
import { NavbarComponent } from './layout/navbar/navbar.component'; // (Optionnel si standalone, mais bonne pratique)

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NavbarComponent],
      providers: [
        provideRouter([]) // On fournit un routeur vide pour le test
      ]
    }).compileComponents();
  });

  // Test 1 : L'application doit se créer
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Test 2 (CORRIGÉ) : On vérifie la structure au lieu du texte "Hello"
  it('should render the layout with navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Déclenche le rendu HTML
    const compiled = fixture.nativeElement as HTMLElement;

    // 1. On vérifie que la div principale "app-layout" existe
    expect(compiled.querySelector('.app-layout')).toBeTruthy();

    // 2. On vérifie que la Navbar est bien présente
    // Note: querySelector cherche la balise <app-navbar>
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });
});