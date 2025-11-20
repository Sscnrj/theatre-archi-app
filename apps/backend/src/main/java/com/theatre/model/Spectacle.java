package com.theatre.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "spectacles")
public class Spectacle {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String titre;

  @Column(nullable = false)
  private String description;

  @Column(nullable = false)
  private LocalDateTime dateSpectacle;

  @Column(nullable = false)
  private Double prix;

  @Column
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
