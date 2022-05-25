package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Movement;
import com.essers.wmsscanner.entity.Pickinglist;
import com.essers.wmsscanner.repository.MovementRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;
import javax.annotation.security.PermitAll;
import java.time.LocalDateTime;
import java.util.List;

@Endpoint
@PermitAll
public class MovementEndpoint {
    @Autowired
    private MovementRepository movementRepository;

    @Nonnull
    public List<@Nonnull Movement> getByPickinglist(Pickinglist pickinglist) {
        return movementRepository.getMovementsByPickinglist(pickinglist);
    }

    @Nonnull
    public Movement getById(Long id) {
        return movementRepository.getById(id);
    }

    public void save(Movement movement) {
        movementRepository.save(movement);
    }

    public void updateUser(String state, String username, Movement mov) {
        Movement movement = movementRepository.getById(mov.getMovementId());
        movement.setState(state);
        movement.setInProgressUser(username);
        movementRepository.save(movement);
    }

    public void updateState(String state, String username, Movement mov) {
        Movement movement = movementRepository.getById(mov.getMovementId());
        movement.setState(state);
        movement.setInProgressTimestamp(LocalDateTime.now());
        movement.setHandledUser(username);
        movement.setInProgressUser("");
        movementRepository.save(movement);
    }
}
