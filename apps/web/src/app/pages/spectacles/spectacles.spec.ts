import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { APP_RUNTIME_CONFIG, RuntimeConfig } from '../../core/config/runtime-config';
import { Spectacles } from './spectacles';

describe('Spectacles integration', () => {
  let component: Spectacles;
  let fixture: ComponentFixture<Spectacles>;
  let httpMock: HttpTestingController;

  const testConfig: RuntimeConfig = {
    production: false,
    springApi: 'http://localhost:8080/api',
    authApi: 'http://localhost:3001',
    paymentApi: 'http://localhost:3002',
    authEnabled: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spectacles],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_RUNTIME_CONFIG, useValue: testConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Spectacles);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads and renders spectacles from backend API', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('http://localhost:8080/api/spectacles');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 1,
        titre: 'Hamlet',
        description: 'Piece dramatique',
        dateSpectacle: '2026-06-20T20:00:00',
        prix: 39.9,
        imageUrl: null,
      },
    ]);

    fixture.detectChanges();

    expect(component.spectacles.length).toBe(1);
    const html = fixture.nativeElement as HTMLElement;
    expect(html.textContent).toContain('Hamlet');
  });
});
