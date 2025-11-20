package com.theatre.repository;

import com.theatre.model.Spectacle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SpectacleRepository extends JpaRepository<Spectacle, Long> {

  List<Spectacle> findByDateSpectacleAfter(LocalDateTime date);
}
