import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_RUNTIME_CONFIG, RuntimeConfig } from '../../core/config/runtime-config';
import { Reservations } from './reservations';

describe('Reservations integration', () => {
  let component: Reservations;
  let fixture: ComponentFixture<Reservations>;
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
      imports: [Reservations],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_RUNTIME_CONFIG, useValue: testConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Reservations);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads and cancels reservations using backend API', () => {
    fixture.detectChanges();

    const loadReq = httpMock.expectOne('http://localhost:8080/api/reservations/mes-reservations');
    expect(loadReq.request.method).toBe('GET');
    loadReq.flush([
      {
        id: 10,
        spectacleId: 2,
        titreSpectacle: 'Le Cid',
        nombrePlaces: 2,
        montantTotal: 42,
        dateReservation: '2026-07-01T10:00:00',
      },
    ]);

    fixture.detectChanges();
    expect(component.reservations.length).toBe(1);

    component.cancel(10);

    const deleteReq = httpMock.expectOne('http://localhost:8080/api/reservations/10');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush(null);

    fixture.detectChanges();
    expect(component.reservations.length).toBe(0);
  });
});
