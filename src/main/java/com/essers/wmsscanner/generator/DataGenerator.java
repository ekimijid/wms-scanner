package com.essers.wmsscanner.generator;

import com.essers.wmsscanner.entity.*;
import com.essers.wmsscanner.repo.*;
import com.vaadin.exampledata.DataType;
import com.vaadin.exampledata.ExampleDataGenerator;
import com.vaadin.flow.spring.annotation.SpringComponent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringComponent
public class DataGenerator {
   @Autowired
    private PasswordEncoder encoder;

    @Bean
    public CommandLineRunner loadData(MovementRepo movementRepo, PickinglistRepo pickinglistRepo,
                                      StockRepo stockRepo, UserRepository userRepository,
                                      RoleRepo roleRepo, ProductRepo productRepo, CompanyRepo companyRepo,
                                      WarehouseRepo warehouseRepo, SiteRepo siteRepo, SupplierRepo supplierRepo) {
        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (pickinglistRepo.count() != 0L) {
                logger.info("Using existing database");
                return;
            }
            int seed = 123;
            logger.info("Generating demo data");

            List<Role> roles=new ArrayList<>();
            Role role = new Role();
            role.setName("Admin");
            Role role1 = new Role();
            role.setName("User");
            roles.add(role);
            roles.add(role1);
            roleRepo.saveAll(roles);
            User user=new User();
            user.setUserName("eki");
            user.setPassword(encoder.encode("user"));
            user.setRoles(roles);
            userRepository.save(user);

            User u=userRepository.getById(user.getId());
            ExampleDataGenerator<Product> productExampleDataGenerator = new ExampleDataGenerator<>(Product.class,
                    LocalDateTime.now());
            productExampleDataGenerator.setData(Product::setProduct_ID, DataType.EAN13);
            productExampleDataGenerator.setData(Product::setName, DataType.TWO_WORDS);
            productExampleDataGenerator.setData(Product::setLocation, DataType.TWO_WORDS);
            List<Product>products=productRepo.saveAll(productExampleDataGenerator.create(100, seed));

            ExampleDataGenerator<Company> companyExampleDataGenerator = new ExampleDataGenerator<>(Company.class,
                    LocalDateTime.now());
            companyExampleDataGenerator.setData(Company::setName, DataType.COMPANY_NAME);
            List<Company> companies=companyRepo.saveAll(companyExampleDataGenerator.create(50, seed));

            List<Warehouse> warehouses=warehouseRepo.saveAll(Stream.of("WH10", "WH11","WH12")
                    .map(Warehouse::new).collect(Collectors.toList()));

            List<Site> sites= siteRepo.saveAll(Stream.of("Winterslag", "Genk").map(Site::new).collect(Collectors.toList()));

            ExampleDataGenerator<Supplier> supplierExampleDataGenerator = new ExampleDataGenerator<>(Supplier.class,
                    LocalDateTime.now());
            supplierExampleDataGenerator.setData(Supplier::setName, DataType.WORD);
            List<Supplier> suppliers=supplierRepo.saveAll(supplierExampleDataGenerator.create(50,seed));

            ExampleDataGenerator<Pickinglist> pickinglistGenerator = new ExampleDataGenerator<>(Pickinglist.class,
                    LocalDateTime.now());
            pickinglistGenerator.setData(Pickinglist::setLocation, DataType.ADDRESS );
            pickinglistGenerator.setData(Pickinglist::setQuantity, DataType.NUMBER_UP_TO_10 );
            pickinglistGenerator.setData(Pickinglist::setUom, DataType.WORD );
            List<Pickinglist> pickinglists =pickinglistGenerator.create(40, seed).stream().map(plist -> {
                plist.setProduct(new Random().ints(10, 0, products.size()).mapToObj(products::get).toList());
                plist.setCompany(companies.get( new Random().nextInt(companyRepo.findAll().size())));
                plist.setSite(sites.get(new Random().nextInt(siteRepo.findAll().size())));
                plist.setWarehouse(warehouses.get(new Random().nextInt(warehouseRepo.findAll().size())));
                plist.setLocation("RETARUS123456789");
                return plist;
            }).collect(Collectors.toList());

            pickinglistRepo.saveAll(pickinglists);
            List<Stock> stocks=new ArrayList<>();
            int i=0;
            for (Pickinglist p:pickinglists
                 ) {
                Stock s=new Stock();

                s.setLocation(p.getLocation());
                s.setProductID(p.getProduct().get(i).getProduct_ID());
                s.setQuantity(2);
                stocks.add(s);
                if(i<9){
                    i++;
                }

            }

            stockRepo.saveAll(stocks);
            List<Movement>movements=new ArrayList<>();
            for (Pickinglist pl: pickinglists
                 ) {

                for (Product p:pl.getProduct()
                     ) {

                    Movement movement=new Movement();
                    movement.setType(Movementtype.FP);
                    movement.setProgresstimestamp(LocalDateTime.now());
                    movement.setWarehouse(pl.getWarehouse().getName());
                    movement.setSite(pl.getSite().getName());
                    movement.setCompany(pl.getCompany().getName());
                    movement.setPickinglist(pl);
                    movement.setLocationfrom(p.getLocation());
                    movement.setLocationto(pl.getLocation());
                    movement.setLocation(pl.getLocation());
                    movement.setQuantity(pl.getQuantity());
                    movement.setUom(pl.getUom());
                    movement.setCompany(pl.getCompany().getName());
                    movement.setProductId(p.getProduct_ID());
                    movement.setPalleteNummer("03600029145");
                    movement.setState("pick");
                    movements.add(movement);
                }
                pl.setMovements(movements);
            }
            movementRepo.saveAll(movements);

            for (Movement m:movements
                 ) {
                for (Stock s:stockRepo.findAll()
                     ) {
                    if(m.getProductId().equals(s.getProductID())){
                        m.getStock().add(s);
                    }
                   movementRepo.save(m);
                }
            }

            logger.info("... generating " + productRepo.findAll().size() + " products in entities...");
            logger.info("... generating " + movementRepo.findAll().size() + " movements in entities...");
            logger.info("... generating " + pickinglistRepo.findAll().size() + " pickinglist in entities...");
            logger.info("... generating " + stockRepo.findAll().size() + " stocklist in entities...");
            logger.info("... generating " + companyRepo.findAll().size() + " companies in entities...");
            logger.info("... generating " + warehouseRepo.findAll().size() + " warehouse in entities...");
            logger.info("... generating " + siteRepo.findAll().size() + " site in entities...");
            logger.info("... generating " + supplierRepo.findAll().size() + " suppliers in entities...");
         //   logger.info(u.getUserName() + " " +u.getPassword()+ " is saved");
        };
    }
}
