package com.theatre.repository;

import com.theatre.model.Reservation;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @EntityGraph(attributePaths = {"spectacle"})
    List<Reservation> findByUserEmail(String email);

    @EntityGraph(attributePaths = {"spectacle"})
    Optional<Reservation> findById(Long id);

    Integer countAllBy();
}