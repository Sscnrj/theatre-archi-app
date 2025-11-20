package com.theatre.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "DTO pour une réservation")
public class ReservationDTO {

  @Schema(description = "ID de la réservation", example = "1")
  private Long id;

  @Schema(description = "ID du spectacle réservé", example = "1")
  private Long spectacleId;

  @Schema(description = "Titre du spectacle réservé", example = "Roméo et Juliette")
  private String titreSpectacle;

  @Schema(description = "Nombre de places réservées", example = "2")
  private Integer nombrePlaces;

  @Schema(description = "Montant total de la réservation", example = "59.98")
  private Double montantTotal;

  @Schema(description = "Date et heure de la réservation", example = "2025-11-15T14:30:00")
  private LocalDateTime dateReservation;

  // Getters et Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getSpectacleId() {
    return spectacleId;
  }

  public void setSpectacleId(Long spectacleId) {
    this.spectacleId = spectacleId;
  }

  public String getTitreSpectacle() {
    return titreSpectacle;
  }

  public void setTitreSpectacle(String titreSpectacle) {
    this.titreSpectacle = titreSpectacle;
  }

  public Integer getNombrePlaces() {
    return nombrePlaces;
  }

  public void setNombrePlaces(Integer nombrePlaces) {
    this.nombrePlaces = nombrePlaces;
  }

  public Double getMontantTotal() {
    return montantTotal;
  }

  public void setMontantTotal(Double montantTotal) {
    this.montantTotal = montantTotal;
  }

  public LocalDateTime getDateReservation() {
    return dateReservation;
  }

  public void setDateReservation(LocalDateTime dateReservation) {
    this.dateReservation = dateReservation;
  }
}
