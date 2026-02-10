package com.theatre.service;

import com.theatre.dto.CreateReservationRequest;
import com.theatre.dto.ReservationDTO;
import com.theatre.exception.ResourceNotFoundException;
import com.theatre.mapper.ReservationMapper;
import com.theatre.model.Reservation;
import com.theatre.model.Spectacle;
import com.theatre.model.User;
import com.theatre.repository.ReservationRepository;
import com.theatre.repository.SpectacleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName(); // Récupère l'email de l'utilisateur connecté

    Reservation reservation = reservationMapper.toEntity(request, spectacle);
    reservation.setUserEmail(email); // À adapter selon ton modèle User

    Reservation savedReservation = reservationRepository.save(reservation);
    return reservationMapper.toDTO(savedReservation);
  }

  public List<ReservationDTO> consulterReservationsUtilisateur() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName();

    List<Reservation> reservations = reservationRepository.findByUserEmail(email);
    return reservations.stream()
      .map(reservationMapper::toDTO)
      .collect(Collectors.toList());
  }

  public void annulerReservation(Long id) {
    Reservation reservation = reservationRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Réservation non trouvée avec l'ID : " + id));

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName();

    if (!reservation.getUserEmail().equals(email)) {
      throw new IllegalStateException("Vous ne pouvez pas annuler une réservation qui ne vous appartient pas.");
    }

    reservationRepository.delete(reservation);
  }
}
