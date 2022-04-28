package com.essers.wmsscanner.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@NotNull
public class Pickinglist implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @OneToOne
    private Company company;

    @OneToOne
    private Site site;

    @OneToOne
    private  Warehouse warehouse;

    @JsonManagedReference
    @OneToMany(mappedBy = "pickinglist")
    private List<Product> product = new ArrayList<>();

    @OneToOne
    private Supplier supplier_ID;

    private Integer quantity;
    private String uom;
    private String location;

    @JsonManagedReference
    @OneToMany(mappedBy = "pickinglist")
    private List<Movement> movements;

}