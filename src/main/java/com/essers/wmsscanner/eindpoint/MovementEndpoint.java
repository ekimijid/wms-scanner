package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Movement;
import com.essers.wmsscanner.entity.Pickinglist;
import com.essers.wmsscanner.repo.MovementRepo;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.security.PermitAll;
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
    Movement getById(Long id){
        return movementRepo.getById(id);
    }

    public void save(Movement movement){
        movementRepo.save(movement);
    }

}
