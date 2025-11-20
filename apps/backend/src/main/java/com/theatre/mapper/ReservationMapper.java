package com.theatre.mapper;

import com.theatre.dto.CreateReservationRequest;
import com.theatre.dto.ReservationDTO;
import com.theatre.model.Reservation;
import com.theatre.model.Spectacle;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "spectacle", source = "spectacle")
  @Mapping(target = "montantTotal", expression = "java(request.getNombrePlaces() * spectacle.getPrix())")
  @Mapping(target = "dateReservation", source = "request.dateReservation", qualifiedByName = "setCurrentDateIfNull")
  Reservation toEntity(CreateReservationRequest request, Spectacle spectacle);

  @Named("setCurrentDateIfNull")
  default LocalDateTime setCurrentDateIfNull(LocalDateTime dateReservation) {
    return dateReservation != null ? dateReservation : LocalDateTime.now();
  }

  @Mapping(target = "spectacleId", source = "reservation.spectacle.id")
  @Mapping(target = "titreSpectacle", source = "reservation.spectacle.titre")
  @Mapping(target = "montantTotal", expression = "java(reservation.getNombrePlaces() * reservation.getSpectacle().getPrix())")
  ReservationDTO toDTO(Reservation reservation);
}
