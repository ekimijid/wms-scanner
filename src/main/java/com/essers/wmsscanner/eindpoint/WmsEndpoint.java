package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Company;
import com.essers.wmsscanner.entity.Movement;
import com.essers.wmsscanner.entity.Pickinglist;
import com.essers.wmsscanner.entity.Product;
import com.essers.wmsscanner.repository.CompanyRepository;
import com.essers.wmsscanner.repository.MovementRepository;
import com.essers.wmsscanner.repository.PickinglistRepository;
import com.essers.wmsscanner.repository.ProductRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.security.PermitAll;
import java.util.Collections;
import java.util.List;

@Endpoint
@PermitAll
public class WmsEndpoint {
    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    PickinglistRepository pickinglistRepository;

    @Autowired
    MovementRepository movementRepository;
    @Autowired
    ProductRepository productRepository;

    public Wmsdata wmsData(){
        Wmsdata wmsdata=new Wmsdata();
        wmsdata.companies= companyRepository.findAll();
        wmsdata.pickinglists= pickinglistRepository.findAll();
        wmsdata.movements= movementRepository.findAll();
        return wmsdata;
    }


    public static class Wmsdata{
        @Nonnull
        public List<@Nonnull Company> companies = Collections.emptyList();

        @Nonnull
        public List<@Nonnull Pickinglist> pickinglists = Collections.emptyList();

        @Nonnull
        public List<@Nonnull Movement> movements = Collections.emptyList();

        @Nonnull
        public List<@Nonnull Product> products = Collections.emptyList();
    }
}
