package com.theatre.controller;

import com.theatre.dto.SpectacleDTO;
import com.theatre.service.SpectacleService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SpectacleControllerTest {

  @Mock
  private SpectacleService spectacleService;

  @InjectMocks
  private SpectacleController spectacleController;

  @Test
  void listerSpectacles_retourneLaListe() {
    SpectacleDTO spectacleDTO = new SpectacleDTO();
    spectacleDTO.setId(1L);
    when(spectacleService.listerSpectaclesDisponibles()).thenReturn(List.of(spectacleDTO));

    ResponseEntity<List<SpectacleDTO>> response = spectacleController.listerSpectacles();

    assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
    assertThat(response.getBody()).hasSize(1);
  }

  @Test
  void consulterSpectacle_retourneLeDetail() {
    SpectacleDTO spectacleDTO = new SpectacleDTO();
    spectacleDTO.setId(12L);
    when(spectacleService.consulterSpectacle(12L)).thenReturn(spectacleDTO);

    ResponseEntity<SpectacleDTO> response = spectacleController.consulterSpectacle(12L);

    assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
    assertThat(response.getBody()).isNotNull();
    assertThat(response.getBody().getId()).isEqualTo(12L);
  }
}
