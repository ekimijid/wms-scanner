package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Movement;
import com.essers.wmsscanner.entity.Product;
import com.essers.wmsscanner.repository.ProductRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.security.PermitAll;

@Endpoint
@PermitAll
public class ProductEndpoint {

    @Autowired
    private ProductRepository productRepository;

    @Nonnull
    public Product getByMovement(Movement movement) {
        return productRepository.getById(movement.getProductId());
    }
}
