package com.theatre.controller;

import com.theatre.dto.CreateReservationRequest;
import com.theatre.dto.ReservationDTO;
import com.theatre.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/reservations")
@Tag(name = "Réservations", description = "Endpoints pour les réservations des utilisateurs")
@PreAuthorize("hasRole('USER')")
public class ReservationController {

  @Autowired
  private ReservationService reservationService;

  @PostMapping
  @Operation(summary = "Réserver un billet")
  public ResponseEntity<ReservationDTO> reserverBillet(@RequestBody CreateReservationRequest request) {
    ReservationDTO reservationDTO = reservationService.reserverBillet(request);
    return ResponseEntity.ok(reservationDTO);
  }

  @GetMapping("/mes-reservations")
  @Operation(summary = "Mes réservations")
  public ResponseEntity<List<ReservationDTO>> consulterMesReservations() {
    List<ReservationDTO> reservations = reservationService.consulterReservationsUtilisateur();
    return ResponseEntity.ok(reservations);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Annuler une réservation")
  public ResponseEntity<Void> annulerReservation(@PathVariable Long id) {
    reservationService.annulerReservation(id);
    return ResponseEntity.noContent().build();
  }
}
