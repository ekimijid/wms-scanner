package com.essers.wmsscanner.repository;

import com.essers.wmsscanner.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    Product findProductByProductId(String id);

}
