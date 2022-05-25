package com.essers.wmsscanner.eindpoint;

import com.essers.wmsscanner.entity.Company;
import com.essers.wmsscanner.repository.CompanyRepository;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.security.PermitAll;
import java.util.List;

@Endpoint
@PermitAll
public class CompanyEndpoint {
    @Autowired
    private CompanyRepository companyRepository;

    @Nonnull
    public List<@Nonnull Company> getAll(){
        return companyRepository.findAll();
    }

    public @Nonnull Company getByID(Long id){
        return companyRepository.getById(id);
    }
}
