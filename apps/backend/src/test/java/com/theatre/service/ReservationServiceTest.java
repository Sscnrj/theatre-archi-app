package com.theatre.service;

import com.theatre.dto.CreateReservationRequest;
import com.theatre.dto.ReservationDTO;
import com.theatre.exception.ResourceNotFoundException;
import com.theatre.mapper.ReservationMapper;
import com.theatre.model.Reservation;
import com.theatre.model.Spectacle;
import com.theatre.repository.ReservationRepository;
import com.theatre.repository.SpectacleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

  @Mock
  private ReservationRepository reservationRepository;

  @Mock
  private SpectacleRepository spectacleRepository;

  @Mock
  private ReservationMapper reservationMapper;

  @InjectMocks
  private ReservationService reservationService;

  @Test
  void reserverBillet_creeEtRetourneUneReservation() {
    CreateReservationRequest request = new CreateReservationRequest();
    request.setSpectacleId(10L);
    Spectacle spectacle = new Spectacle();
    Reservation reservation = new Reservation();
    Reservation saved = new Reservation();
    ReservationDTO dto = new ReservationDTO();

    when(spectacleRepository.findById(10L)).thenReturn(Optional.of(spectacle));
    when(reservationMapper.toEntity(request, spectacle)).thenReturn(reservation);
    when(reservationRepository.save(any(Reservation.class))).thenReturn(saved);
    when(reservationMapper.toDTO(saved)).thenReturn(dto);

    ReservationDTO result = reservationService.reserverBillet(request);

    assertThat(result).isSameAs(dto);
    verify(reservationRepository).save(any(Reservation.class));
  }

  @Test
  void annulerReservation_lanceUneErreurSiIntrouvable() {
    when(reservationRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> reservationService.annulerReservation(99L))
      .isInstanceOf(ResourceNotFoundException.class);
  }

  @Test
  void consulterReservationsUtilisateur_mappeToutesLesReservations() {
    Reservation reservation = new Reservation();
    ReservationDTO dto = new ReservationDTO();
    when(reservationRepository.findAll()).thenReturn(List.of(reservation));
    when(reservationMapper.toDTO(reservation)).thenReturn(dto);

    List<ReservationDTO> result = reservationService.consulterReservationsUtilisateur();

    assertThat(result).containsExactly(dto);
  }
}
