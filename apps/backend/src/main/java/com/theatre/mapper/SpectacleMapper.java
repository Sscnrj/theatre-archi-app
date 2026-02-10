package com.theatre.mapper;

import com.theatre.dto.CreateSpectacleRequest;
import com.theatre.dto.SpectacleDTO;
import com.theatre.dto.UpdateSpectacleRequest;
import com.theatre.model.Spectacle;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SpectacleMapper {

  @Mapping(target = "id", ignore = true)
  Spectacle toEntity(CreateSpectacleRequest request);

  SpectacleDTO toDTO(Spectacle spectacle);

  @Mapping(target = "id", ignore = true)
  void updateEntityFromDTO(UpdateSpectacleRequest request, @MappingTarget Spectacle spectacle);
}
