package com.theatre.service;

import com.theatre.dto.StatsResponse;
import com.theatre.model.Reservation;
import com.theatre.model.Spectacle;
import com.theatre.repository.ReservationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StatsServiceTest {

  @Mock
  private ReservationRepository reservationRepository;

  @InjectMocks
  private StatsService statsService;

  @Test
  void consulterStatistiques_agregeLesDonnees() {
    Spectacle spectacle = new Spectacle();
    spectacle.setId(1L);
    spectacle.setPrix(12.5);

    Reservation r1 = new Reservation();
    r1.setNombrePlaces(2);
    r1.setSpectacle(spectacle);

    Reservation r2 = new Reservation();
    r2.setNombrePlaces(1);
    r2.setSpectacle(spectacle);

    when(reservationRepository.countAllBy()).thenReturn(2);
    when(reservationRepository.findAll()).thenReturn(List.of(r1, r2));

    StatsResponse result = statsService.consulterStatistiques();

    assertThat(result.getTotalReservations()).isEqualTo(2);
    assertThat(result.getMontantTotalVentes()).isEqualTo(37.5);
    assertThat(result.getReservationsParSpectacle()).containsEntry(1L, 3);
  }
}
