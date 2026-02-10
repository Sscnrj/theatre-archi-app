package com.theatre.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "DTO pour un spectacle")
public class SpectacleDTO {

  @Schema(description = "ID du spectacle", example = "1")
  private Long id;

  @Schema(description = "Titre du spectacle", example = "Roméo et Juliette")
  private String titre;

  @Schema(description = "Description du spectacle", example = "Une tragédie romantique de William Shakespeare.")
  private String description;

  @Schema(description = "Date et heure du spectacle", example = "2025-12-20T20:00:00")
  private LocalDateTime dateSpectacle;

  @Schema(description = "Prix du billet", example = "29.99")
  private Double prix;

  @Schema(description = "URL de l'image du spectacle", example = "https://exemple.com/images/romeo-et-juliette.jpg")
  private String imageUrl;

  // Getters et Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitre() {
    return titre;
  }

  public void setTitre(String titre) {
    this.titre = titre;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public LocalDateTime getDateSpectacle() {
    return dateSpectacle;
  }

  public void setDateSpectacle(LocalDateTime dateSpectacle) {
    this.dateSpectacle = dateSpectacle;
  }

  public Double getPrix() {
    return prix;
  }

  public void setPrix(Double prix) {
    this.prix = prix;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
}
