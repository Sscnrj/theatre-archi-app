package com.theatre.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Map;

@Schema(description = "Réponse pour les statistiques de ventes")
public class StatsResponse {

  @Schema(description = "Nombre total de réservations", example = "42")
  private Integer totalReservations;

  @Schema(description = "Montant total des ventes", example = "1259.58")
  private Double montantTotalVentes;

  @Schema(description = "Statistiques par spectacle (ID du spectacle -> nombre de réservations)")
  private Map<Long, Integer> reservationsParSpectacle;

  // Getters et Setters
  public Integer getTotalReservations() {
    return totalReservations;
  }

  public void setTotalReservations(Integer totalReservations) {
    this.totalReservations = totalReservations;
  }

  public Double getMontantTotalVentes() {
    return montantTotalVentes;
  }

  public void setMontantTotalVentes(Double montantTotalVentes) {
    this.montantTotalVentes = montantTotalVentes;
  }

  public Map<Long, Integer> getReservationsParSpectacle() {
    return reservationsParSpectacle;
  }

  public void setReservationsParSpectacle(Map<Long, Integer> reservationsParSpectacle) {
    this.reservationsParSpectacle = reservationsParSpectacle;
  }
}
