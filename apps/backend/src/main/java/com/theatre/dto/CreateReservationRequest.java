package com.theatre.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

@Schema(description = "Requête pour créer une réservation")
public class CreateReservationRequest {

  @NotNull(message = "L'ID du spectacle est obligatoire")
  @Schema(description = "ID du spectacle à réserver", example = "1")
  private Long spectacleId;

  @NotNull(message = "Le nombre de places est obligatoire")
  @Positive(message = "Le nombre de places doit être positif")
  @Schema(description = "Nombre de places à réserver", example = "2")
  private Integer nombrePlaces;

  @Schema(description = "Date et heure de la réservation (optionnel, par défaut la date actuelle)", example = "2025-12-20T20:00:00")
  private LocalDateTime dateReservation;

  // Getters et Setters
  public Long getSpectacleId() {
    return spectacleId;
  }

  public void setSpectacleId(Long spectacleId) {
    this.spectacleId = spectacleId;
  }

  public Integer getNombrePlaces() {
    return nombrePlaces;
  }

  public void setNombrePlaces(Integer nombrePlaces) {
    this.nombrePlaces = nombrePlaces;
  }

  public LocalDateTime getDateReservation() {
    return dateReservation;
  }

  public void setDateReservation(LocalDateTime dateReservation) {
    this.dateReservation = dateReservation;
  }
}
