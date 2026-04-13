import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { APP_RUNTIME_CONFIG, RuntimeConfig } from './core/config/runtime-config';

describe('App', () => {
  const testConfig: RuntimeConfig = {
    production: false,
    springApi: 'http://localhost:8080/api',
    authApi: 'http://localhost:3001',
    paymentApi: 'http://localhost:3002',
    authEnabled: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: APP_RUNTIME_CONFIG, useValue: testConfig },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navigation shell', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.topbar')).not.toBeNull();
    expect(compiled.querySelector('.brand')?.textContent).toContain('Theatre Archi');
  });
});
