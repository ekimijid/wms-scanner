package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Company;
import com.essers.wmsscanner.entity.Movement;
import com.essers.wmsscanner.entity.Pickinglist;
import com.essers.wmsscanner.entity.Product;
import com.essers.wmsscanner.repo.CompanyRepo;
import com.essers.wmsscanner.repo.MovementRepo;
import com.essers.wmsscanner.repo.PickinglistRepo;
import com.essers.wmsscanner.repo.ProductRepo;
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
    CompanyRepo companyRepo;

    @Autowired
    PickinglistRepo pickinglistRepo;

    @Autowired
    MovementRepo movementRepo;
    @Autowired
    ProductRepo productRepo;

    public Wmsdata wmsData(){
        Wmsdata wmsdata=new Wmsdata();
        wmsdata.companies=companyRepo.findAll();
        wmsdata.pickinglists=pickinglistRepo.findAll();
        wmsdata.movements=movementRepo.findAll();
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
