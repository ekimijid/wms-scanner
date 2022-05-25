package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Company;
import com.essers.wmsscanner.entity.Pickinglist;
import com.essers.wmsscanner.repository.PickinglistRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.security.PermitAll;
import java.util.List;

@Endpoint
@PermitAll
public class PickinlistEndpoint {
    @Autowired
    private PickinglistRepository pickinglistRepository;

    @Nonnull
    public List<@Nonnull Pickinglist> getAll(Company company) {
        return pickinglistRepository.getPickinglistsByCompany(company);
    }

    @Nonnull
    public Pickinglist getById(Long id) {
        return pickinglistRepository.getById(id);
    }
}
