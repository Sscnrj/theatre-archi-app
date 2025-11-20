package com.theatre.controller;

import com.theatre.dto.SpectacleDTO;
import com.theatre.service.SpectacleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/spectacles")
@Tag(name = "Spectacles", description = "Endpoints pour consulter les spectacles")
@PreAuthorize("hasRole('USER')")
public class SpectacleController {

  @Autowired
  private SpectacleService spectacleService;

  @GetMapping
  @Operation(summary = "Lister les spectacles disponibles")
  public ResponseEntity<List<SpectacleDTO>> listerSpectacles() {
    List<SpectacleDTO> spectacles = spectacleService.listerSpectaclesDisponibles();
    return ResponseEntity.ok(spectacles);
  }

  @GetMapping("/{id}")
  @Operation(summary = "Détails d'un spectacle")
  public ResponseEntity<SpectacleDTO> consulterSpectacle(@PathVariable Long id) {
    SpectacleDTO spectacleDTO = spectacleService.consulterSpectacle(id);
    return ResponseEntity.ok(spectacleDTO);
  }
}
