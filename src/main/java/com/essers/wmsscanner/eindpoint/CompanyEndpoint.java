package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Company;
import com.essers.wmsscanner.repo.CompanyRepo;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.security.PermitAll;
import java.util.List;

@Endpoint
@PermitAll
public class CompanyEndpoint {
    @Autowired
    private CompanyRepo companyRepo;

    @Nonnull
    public List<@Nonnull Company> getAll(){
        return companyRepo.findAll();
    }

    public @Nonnull Company getByID(Long id){
        return companyRepo.getById(id);
    }
}
