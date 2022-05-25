package com.essers.wmsscanner.repository;

import com.essers.wmsscanner.entity.Movement;
import com.essers.wmsscanner.entity.Pickinglist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovementRepository extends JpaRepository<Movement, Long> {
    List<Movement> getMovementsByPickinglist(Pickinglist pickinglist);
    Movement findMovementByMovementId(Long id);
}
