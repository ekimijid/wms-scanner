package com.essers.wmsscanner.repo;

import com.essers.wmsscanner.entity.Company;
import com.essers.wmsscanner.entity.Pickinglist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickinglistRepo extends JpaRepository<Pickinglist, Long> {
    List<Pickinglist> getPickinglistsByCompany(Company company);
}
