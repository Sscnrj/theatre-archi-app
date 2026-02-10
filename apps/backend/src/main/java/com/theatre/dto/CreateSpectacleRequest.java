package com.theatre.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;

@Schema(description = "Requête pour créer un spectacle")
public class CreateSpectacleRequest {

  @NotBlank(message = "Le titre du spectacle est obligatoire")
  @Schema(description = "Titre du spectacle", example = "Roméo et Juliette")
  private String titre;

  @NotBlank(message = "La description du spectacle est obligatoire")
  @Schema(description = "Description du spectacle", example = "Une tragédie romantique de William Shakespeare.")
  private String description;

  @NotNull(message = "La date du spectacle est obligatoire")
  @Schema(description = "Date et heure du spectacle", example = "2025-12-20T20:00:00")
  private LocalDateTime dateSpectacle;

  @NotNull(message = "Le prix du spectacle est obligatoire")
  @PositiveOrZero(message = "Le prix doit être positif ou nul")
  @Schema(description = "Prix du billet", example = "29.99")
  private Double prix;

  @Schema(description = "URL de l'image du spectacle", example = "https://exemple.com/images/romeo-et-juliette.jpg")
  private String imageUrl;

  // Getters et Setters
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
