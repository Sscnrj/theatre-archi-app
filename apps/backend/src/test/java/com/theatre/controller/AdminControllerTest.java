package com.theatre.controller;

import com.theatre.dto.CreateSpectacleRequest;
import com.theatre.dto.SpectacleDTO;
import com.theatre.dto.StatsResponse;
import com.theatre.service.SpectacleService;
import com.theatre.service.StatsService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminControllerTest {

  @Mock
  private SpectacleService spectacleService;

  @Mock
  private StatsService statsService;

  @InjectMocks
  private AdminController adminController;

  @Test
  void ajouterSpectacle_retourneLeSpectacleCree() {
    CreateSpectacleRequest request = new CreateSpectacleRequest();
    SpectacleDTO dto = new SpectacleDTO();
    dto.setId(5L);

    when(spectacleService.ajouterSpectacle(request)).thenReturn(dto);

    ResponseEntity<SpectacleDTO> response = adminController.ajouterSpectacle(request);

    assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
    assertThat(response.getBody()).isNotNull();
    assertThat(response.getBody().getId()).isEqualTo(5L);
  }

  @Test
  void consulterStatistiques_retourneLesStats() {
    StatsResponse stats = new StatsResponse();
    stats.setTotalReservations(7);
    when(statsService.consulterStatistiques()).thenReturn(stats);

    ResponseEntity<StatsResponse> response = adminController.consulterStatistiques();

    assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
    assertThat(response.getBody()).isNotNull();
    assertThat(response.getBody().getTotalReservations()).isEqualTo(7);
  }
}
