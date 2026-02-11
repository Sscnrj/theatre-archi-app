package com.theatre.repository;

import com.theatre.model.Reservation;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

  // 👤 Réservations de l'utilisateur connecté (JWT sub)
  @EntityGraph(attributePaths = {"spectacle"})
  List<Reservation> findByUserId(String userId);

  // 🔍 Détail réservation avec spectacle chargé
  @Override
  @EntityGraph(attributePaths = {"spectacle"})
  Optional<Reservation> findById(Long id);

  // 📊 Statistique simple
  Integer countAllBy();
}
