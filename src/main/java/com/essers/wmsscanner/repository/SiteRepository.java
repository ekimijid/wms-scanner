package com.essers.wmsscanner.repository;

import com.essers.wmsscanner.entity.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteRepository extends JpaRepository<Site,Long> {
    Site findSiteById(Long id);

}
