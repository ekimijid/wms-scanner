package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Movement;
import com.essers.wmsscanner.entity.Product;
import com.essers.wmsscanner.repo.ProductRepo;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.security.PermitAll;

@Endpoint
@PermitAll
public class ProductEndpoint {

    @Autowired
    private ProductRepo productRepo;

    @Nonnull
    public Product getByMovement(Movement movement){
        return productRepo.getById(movement.getProductId());
    }
}
