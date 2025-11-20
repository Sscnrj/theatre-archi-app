package com.theatre.controller;

import com.theatre.dto.CreateSpectacleRequest;
import com.theatre.dto.SpectacleDTO;
import com.theatre.dto.StatsResponse;
import com.theatre.dto.UpdateSpectacleRequest;
import com.theatre.service.SpectacleService;
import com.theatre.service.StatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin", description = "Endpoints pour les administrateurs")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

  @Autowired
  private SpectacleService spectacleService;

  @Autowired
  private StatsService statsService;

  @PostMapping("/spectacles")
  @Operation(summary = "Ajouter un spectacle")
  public ResponseEntity<SpectacleDTO> ajouterSpectacle(@RequestBody CreateSpectacleRequest request) {
    SpectacleDTO spectacleDTO = spectacleService.ajouterSpectacle(request);
    return ResponseEntity.ok(spectacleDTO);
  }

  @PutMapping("/spectacles/{id}")
  @Operation(summary = "Modifier un spectacle")
  public ResponseEntity<SpectacleDTO> modifierSpectacle(@PathVariable Long id, @RequestBody UpdateSpectacleRequest request) {
    SpectacleDTO spectacleDTO = spectacleService.modifierSpectacle(id, request);
    return ResponseEntity.ok(spectacleDTO);
  }

  @DeleteMapping("/spectacles/{id}")
  @Operation(summary = "Supprimer un spectacle")
  public ResponseEntity<Void> supprimerSpectacle(@PathVariable Long id) {
    spectacleService.supprimerSpectacle(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/spectacles")
  @Operation(summary = "Lister tous les spectacles")
  public ResponseEntity<List<SpectacleDTO>> listerSpectacles() {
    List<SpectacleDTO> spectacles = spectacleService.listerSpectacles();
    return ResponseEntity.ok(spectacles);
  }

  @GetMapping("/statistiques")
  @Operation(summary = "Statistiques de ventes")
  public ResponseEntity<StatsResponse> consulterStatistiques() {
    StatsResponse stats = statsService.consulterStatistiques();
    return ResponseEntity.ok(stats);
  }
}
