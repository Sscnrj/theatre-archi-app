package com.theatre.service;

import com.theatre.dto.CreateSpectacleRequest;
import com.theatre.dto.SpectacleDTO;
import com.theatre.dto.UpdateSpectacleRequest;
import com.theatre.exception.ResourceNotFoundException;
import com.theatre.mapper.SpectacleMapper;
import com.theatre.model.Spectacle;
import com.theatre.repository.SpectacleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpectacleService {

  @Autowired
  private SpectacleRepository spectacleRepository;

  @Autowired
  private SpectacleMapper spectacleMapper;

  public SpectacleDTO ajouterSpectacle(CreateSpectacleRequest request) {
    Spectacle spectacle = spectacleMapper.toEntity(request);
    Spectacle savedSpectacle = spectacleRepository.save(spectacle);
    return spectacleMapper.toDTO(savedSpectacle);
  }

  public SpectacleDTO modifierSpectacle(Long id, UpdateSpectacleRequest request) {
    Spectacle spectacle = spectacleRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Spectacle non trouvé avec l'ID : " + id));

    spectacleMapper.updateEntityFromDTO(request, spectacle);
    Spectacle updatedSpectacle = spectacleRepository.save(spectacle);
    return spectacleMapper.toDTO(updatedSpectacle);
  }

  public void supprimerSpectacle(Long id) {
    Spectacle spectacle = spectacleRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Spectacle non trouvé avec l'ID : " + id));

    spectacleRepository.delete(spectacle);
  }

  public List<SpectacleDTO> listerSpectacles() {
    return spectacleRepository.findAll().stream()
      .map(spectacleMapper::toDTO)
      .collect(Collectors.toList());
  }

  public List<SpectacleDTO> listerSpectaclesDisponibles() {
    LocalDateTime now = LocalDateTime.now();
    return spectacleRepository.findByDateSpectacleAfter(now).stream()
      .map(spectacleMapper::toDTO)
      .collect(Collectors.toList());
  }

  public SpectacleDTO consulterSpectacle(Long id) {
    Spectacle spectacle = spectacleRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Spectacle non trouvé avec l'ID : " + id));
    return spectacleMapper.toDTO(spectacle);
  }
}
