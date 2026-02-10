package com.theatre.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
public class Reservation {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "spectacle_id", nullable = false)
  private Spectacle spectacle;

  @Column(nullable = false)
  private String userEmail;

  @Column(nullable = false)
  private Integer nombrePlaces;

  @Column(nullable = false)
  private Double montantTotal;

  @Column(nullable = false)
  private LocalDateTime dateReservation;

  // Getters et Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Spectacle getSpectacle() {
    return spectacle;
  }

  public void setSpectacle(Spectacle spectacle) {
    this.spectacle = spectacle;
  }

  public String getUserEmail() {
    return userEmail;
  }

  public void setUserEmail(String userEmail) {
    this.userEmail = userEmail;
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
