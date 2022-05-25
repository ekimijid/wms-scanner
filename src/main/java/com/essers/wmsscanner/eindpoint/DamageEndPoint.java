package com.essers.wmsscanner.eindpoint;


import com.essers.wmsscanner.entity.Damagereport;
import com.essers.wmsscanner.entity.Movement;
import com.essers.wmsscanner.repository.DamagereportRepository;
import dev.hilla.Endpoint;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import javax.annotation.security.PermitAll;
import java.util.List;

@Endpoint
@PermitAll
public class DamageEndPoint {

    @Autowired
    DamagereportRepository damagereportRepository;

    @NonNull
    public List<@NonNull Damagereport> getAllDamages() {
        return damagereportRepository.findAll();
    }

    public void saveReport(Movement movement, String description) {
        Damagereport damagereport = new Damagereport();
        damagereport.setDescription(description);
        //damagereport.setImage(Files.readAllBytes(imageFile.toPath()));
        damagereport.setMovementID(movement.getMovementId().toString());
        damagereport.setProductID(movement.getProductId());
        damagereportRepository.save(damagereport);
    }
}
