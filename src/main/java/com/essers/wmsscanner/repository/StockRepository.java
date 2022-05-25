package com.essers.wmsscanner.repository;

import com.essers.wmsscanner.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    Stock findStockById(Long id);

}
