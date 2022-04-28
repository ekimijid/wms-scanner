package com.essers.wmsscanner.repo;

import com.essers.wmsscanner.entity.Movement;
import com.essers.wmsscanner.entity.Pickinglist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovementRepo extends JpaRepository<Movement, Long> {
    List<Movement> getMovementsByPickinglist(Pickinglist pickinglist);
}
