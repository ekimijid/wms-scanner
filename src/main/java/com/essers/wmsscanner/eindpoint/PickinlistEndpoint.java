package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Company;
import com.essers.wmsscanner.entity.Pickinglist;
import com.essers.wmsscanner.repo.PickinglistRepo;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;
import javax.annotation.security.PermitAll;
import java.util.List;

@Endpoint
@PermitAll
public class PickinlistEndpoint {
    @Autowired
    private PickinglistRepo pickinglistRepo;

    @Nonnull
    public List<@Nonnull Pickinglist> getAll(Company company){
        return pickinglistRepo.getPickinglistsByCompany(company);
    }

    @Nonnull
    public Pickinglist getById(Long id){
        return pickinglistRepo.getById(id);
    }
}
