package com.theatre.service;

import com.theatre.dto.CreateReservationRequest;
import com.theatre.dto.ReservationDTO;
import com.theatre.exception.ResourceNotFoundException;
import com.theatre.mapper.ReservationMapper;
import com.theatre.model.Reservation;
import com.theatre.model.Spectacle;
import com.theatre.repository.ReservationRepository;
import com.theatre.repository.SpectacleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

  @Autowired
  private ReservationRepository reservationRepository;

  @Autowired
  private SpectacleRepository spectacleRepository;

  @Autowired
  private ReservationMapper reservationMapper;

  public ReservationDTO reserverBillet(CreateReservationRequest request) {
    Spectacle spectacle = spectacleRepository.findById(request.getSpectacleId())
      .orElseThrow(() -> new ResourceNotFoundException("Spectacle non trouvé avec l'ID : " + request.getSpectacleId()));

    // TODO: À remplacer par l'authentification réelle via JWT
    String userId = "user-temp-" + System.currentTimeMillis();
    String userEmail = "user@example.com";

    Reservation reservation = reservationMapper.toEntity(request, spectacle);
    reservation.setUserId(userId);
    reservation.setUserEmail(userEmail);

    Reservation savedReservation = reservationRepository.save(reservation);
    return reservationMapper.toDTO(savedReservation);
  }

  public List<ReservationDTO> consulterReservationsUtilisateur() {
    // TODO: À remplacer par l'authentification réelle via JWT
    // Pour l'instant, retourne toutes les réservations
    List<Reservation> reservations = reservationRepository.findAll();
    return reservations.stream()
      .map(reservationMapper::toDTO)
      .collect(Collectors.toList());
  }

  public void annulerReservation(Long id) {
    Reservation reservation = reservationRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Réservation non trouvée avec l'ID : " + id));

    // TODO: Vérifier que l'utilisateur connecté est propriétaire de la réservation
    reservationRepository.delete(reservation);
  }
}
