export enum TestKey {
  Header = 'header',
  HeaderBrand = 'header-brand',
  HeaderMenu = 'header-menu',
  NavSpectaclesLink = 'nav-spectacles-link',
  NavReservationsLink = 'nav-reservations-link',
  SessionContainer = 'session-container',
  SessionModeBadge = 'session-mode-badge',
  SessionUserEmail = 'session-user-email',
  LogoutButton = 'logout-button',
  HeaderLoginLink = 'header-login-link',
  HeaderRegisterLink = 'header-register-link',

  LoginPage = 'login-page',
  LoginTitle = 'login-title',
  LoginDemoNote = 'login-demo-note',
  LoginForm = 'login-form',
  LoginEmail = 'login-email',
  LoginPassword = 'login-password',
  LoginEmailError = 'login-email-error',
  LoginPasswordError = 'login-password-error',
  LoginError = 'login-error',
  LoginSubmit = 'login-submit',
  LoginAltAction = 'login-alt-action',
  LoginRegisterLink = 'login-register-link',

  RegisterPage = 'register-page',
  RegisterTitle = 'register-title',
  RegisterDemoNote = 'register-demo-note',
  RegisterForm = 'register-form',
  RegisterNom = 'register-nom',
  RegisterPrenom = 'register-prenom',
  RegisterEmail = 'register-email',
  RegisterPassword = 'register-password',
  RegisterEmailError = 'register-email-error',
  RegisterPasswordError = 'register-password-error',
  RegisterError = 'register-error',
  RegisterSubmit = 'register-submit',
  RegisterAltAction = 'register-alt-action',
  RegisterLoginLink = 'register-login-link',

  SpectaclesPage = 'spectacles-page',
  SpectaclesTitle = 'spectacles-title',
  SpectaclesLoading = 'spectacles-loading',
  SpectaclesError = 'spectacles-error',
  SpectaclesGrid = 'spectacles-grid',
  SpectacleCard = 'spectacle-card',
  SpectacleImage = 'spectacle-image',
  SpectacleTitle = 'spectacle-title',
  SpectacleDescription = 'spectacle-description',
  SpectacleDate = 'spectacle-date',
  SpectaclePrice = 'spectacle-price',
  SpectacleDetailLink = 'spectacle-detail-link',

  SpectacleDetailPage = 'spectacle-detail-page',
  SpectacleBackLink = 'spectacle-back-link',
  SpectacleDetailLoading = 'spectacle-detail-loading',
  SpectacleDetailError = 'spectacle-detail-error',
  SpectacleDetailCard = 'spectacle-detail-card',
  SpectacleDetailImage = 'spectacle-detail-image',
  SpectacleDetailTitle = 'spectacle-detail-title',
  SpectacleDetailDescription = 'spectacle-detail-description',
  SpectacleDetailDate = 'spectacle-detail-date',
  SpectacleDetailPrice = 'spectacle-detail-price',
  ReservationForm = 'reservation-form',
  ReservationPlacesInput = 'reservation-nombre-places',
  ReservationPlacesError = 'reservation-nombre-places-error',
  ReservationSubmit = 'reservation-submit',
  ReservationSuccess = 'reservation-success',

  ReservationsPage = 'reservations-page',
  ReservationsTitle = 'reservations-title',
  ReservationsLoading = 'reservations-loading',
  ReservationsError = 'reservations-error',
  ReservationsEmpty = 'reservation-empty',
  ReservationsList = 'reservations-list',
  ReservationItem = 'reservation-item',
  ReservationTitle = 'reservation-title',
  ReservationDate = 'reservation-date',
  ReservationPlaces = 'reservation-places',
  ReservationAmount = 'reservation-amount',
  ReservationCancel = 'reservation-cancel',
}

export type TestKeyParamValue = string | number | boolean;

export function withParam(
  key: TestKey | string,
  paramName: string,
  value: TestKeyParamValue,
): string {
  const normalizedParamName = paramName.trim();
  if (!normalizedParamName) {
    throw new Error('paramName must be provided to build a parameterized test key.');
  }

  return `${String(key)},${normalizedParamName}=${String(value)}`;
}
