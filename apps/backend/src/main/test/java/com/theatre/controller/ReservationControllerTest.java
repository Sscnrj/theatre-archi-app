package com.theatre.controller;

import com.theatre.dto.CreateReservationRequest;
import com.theatre.dto.ReservationDTO;
import com.theatre.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ReservationControllerTest {

    @Mock
    private ReservationService reservationService;

    @InjectMocks
    private ReservationController reservationController;

    @Test
    public void testReserverBillet() {
        CreateReservationRequest request = new CreateReservationRequest();
        request.setSpectacleId(1L);
        request.setNombrePlaces(2);

        ReservationDTO mockReservationDTO = new ReservationDTO();
        mockReservationDTO.setId(1L);

        when(reservationService.reserverBillet(any(CreateReservationRequest.class)))
                .thenReturn(mockReservationDTO);

        ResponseEntity<ReservationDTO> response = reservationController.reserverBillet(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1L, response.getBody().getId());
    }

    @Test
    public void testConsulterMesReservations() {
        List<ReservationDTO> mockReservations = Collections.singletonList(new ReservationDTO());

        when(reservationService.consulterReservationsUtilisateur())
                .thenReturn(mockReservations);

        ResponseEntity<List<ReservationDTO>> response = reservationController.consulterMesReservations();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
    }
}