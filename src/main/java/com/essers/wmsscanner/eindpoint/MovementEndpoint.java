package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Movement;
import com.essers.wmsscanner.entity.Pickinglist;
import com.essers.wmsscanner.repo.MovementRepo;
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
    private MovementRepo movementRepo;

    @Nonnull
    public List<@Nonnull Movement> getByPickinglist(Pickinglist pickinglist){
        return movementRepo.getMovementsByPickinglist(pickinglist);
    }
    @Nonnull
    public Movement getById(Long id){
        return movementRepo.getById(id);
    }

    public void save(Movement movement){
        movementRepo.save(movement);
    }

    public void updateUser(String state, String username, Movement mov){
        Movement movement=movementRepo.getById(mov.getMovementId());
        movement.setState(state);
        movement.setProgressuser(username);
        movementRepo.save(movement);
    }

    public void updateState(String state, String username, Movement mov){
        Movement movement=movementRepo.getById(mov.getMovementId());
        movement.setState(state);
        movement.setProgresstimestamp(LocalDateTime.now());
        movement.setHandleduser(username);
        movement.setProgressuser("");
        movementRepo.save(movement);
    }
}
