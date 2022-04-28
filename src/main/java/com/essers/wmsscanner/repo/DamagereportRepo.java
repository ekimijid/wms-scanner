package com.essers.wmsscanner.repo;

import com.essers.wmsscanner.entity.Damagereport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DamagereportRepo extends JpaRepository<Damagereport, Long> {

}
