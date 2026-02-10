package com.theatre.service;

import com.theatre.dto.StatsResponse;
import com.theatre.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StatsService {

  @Autowired
  private ReservationRepository reservationRepository;

  public StatsResponse consulterStatistiques() {
    StatsResponse statsResponse = new StatsResponse();

    // Nombre total de réservations
    Integer totalReservations = reservationRepository.countAllBy();
    statsResponse.setTotalReservations(totalReservations);

    // Montant total des ventes
    Double montantTotalVentes = reservationRepository.findAll().stream()
      .mapToDouble(reservation -> reservation.getNombrePlaces() * reservation.getSpectacle().getPrix())
      .sum();
    statsResponse.setMontantTotalVentes(montantTotalVentes);

    // Réservations par spectacle
    Map<Long, Integer> reservationsParSpectacle = new HashMap<>();
    reservationRepository.findAll().forEach(reservation -> {
      Long spectacleId = reservation.getSpectacle().getId();
      reservationsParSpectacle.merge(spectacleId, reservation.getNombrePlaces(), Integer::sum);
    });
    statsResponse.setReservationsParSpectacle(reservationsParSpectacle);

    return statsResponse;
  }
}
