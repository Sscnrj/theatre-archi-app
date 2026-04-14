import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { APP_RUNTIME_CONFIG, RuntimeConfig } from '../../core/config/runtime-config';
import { SpectacleDetail } from './spectacle-detail';

describe('SpectacleDetail integration', () => {
  let component: SpectacleDetail;
  let fixture: ComponentFixture<SpectacleDetail>;
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
      imports: [SpectacleDetail],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_RUNTIME_CONFIG, useValue: testConfig },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '12' }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpectacleDetail);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads detail and posts reservation payload', () => {
    fixture.detectChanges();

    const detailReq = httpMock.expectOne('http://localhost:8080/api/spectacles/12');
    expect(detailReq.request.method).toBe('GET');
    detailReq.flush({
      id: 12,
      titre: 'Cyrano',
      description: 'Drame romantique',
      dateSpectacle: '2026-08-10T20:00:00',
      prix: 27.5,
      imageUrl: null,
    });

    fixture.detectChanges();

    component.reservationForm.setValue({ nombrePlaces: 2 });
    component.reserve();

    const reservationReq = httpMock.expectOne('http://localhost:8080/api/reservations');
    expect(reservationReq.request.method).toBe('POST');
    expect(reservationReq.request.body).toEqual({ spectacleId: 12, nombrePlaces: 2 });
    reservationReq.flush({
      id: 44,
      spectacleId: 12,
      titreSpectacle: 'Cyrano',
      nombrePlaces: 2,
      montantTotal: 55,
      dateReservation: '2026-07-01T12:00:00',
    });

    fixture.detectChanges();
    expect(component.successMessage).toContain('#44');
  });
});
