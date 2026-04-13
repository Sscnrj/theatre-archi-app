package com.theatre.service;

import com.theatre.dto.CreateSpectacleRequest;
import com.theatre.dto.SpectacleDTO;
import com.theatre.dto.UpdateSpectacleRequest;
import com.theatre.exception.ResourceNotFoundException;
import com.theatre.mapper.SpectacleMapper;
import com.theatre.model.Spectacle;
import com.theatre.repository.SpectacleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SpectacleServiceTest {

  @Mock
  private SpectacleRepository spectacleRepository;

  @Mock
  private SpectacleMapper spectacleMapper;

  @InjectMocks
  private SpectacleService spectacleService;

  @Test
  void ajouterSpectacle_sauvegardeEtRetourneDTO() {
    CreateSpectacleRequest request = new CreateSpectacleRequest();
    Spectacle entity = new Spectacle();
    Spectacle saved = new Spectacle();
    SpectacleDTO dto = new SpectacleDTO();

    when(spectacleMapper.toEntity(request)).thenReturn(entity);
    when(spectacleRepository.save(entity)).thenReturn(saved);
    when(spectacleMapper.toDTO(saved)).thenReturn(dto);

    SpectacleDTO result = spectacleService.ajouterSpectacle(request);

    assertThat(result).isSameAs(dto);
    verify(spectacleRepository).save(entity);
  }

  @Test
  void modifierSpectacle_lanceUneErreurSiIntrouvable() {
    when(spectacleRepository.findById(1L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> spectacleService.modifierSpectacle(1L, new UpdateSpectacleRequest()))
      .isInstanceOf(ResourceNotFoundException.class);
  }

  @Test
  void listerSpectaclesDisponibles_filtreLesSpectaclesPasses() {
    Spectacle futur = new Spectacle();
    when(spectacleRepository.findByDateSpectacleAfter(any(LocalDateTime.class))).thenReturn(List.of(futur));
    SpectacleDTO dto = new SpectacleDTO();
    when(spectacleMapper.toDTO(futur)).thenReturn(dto);

    List<SpectacleDTO> result = spectacleService.listerSpectaclesDisponibles();

    assertThat(result).containsExactly(dto);
  }
}
