package com.essers.wmsscanner.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
//@Transactional
public class Movement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movementId;
    private String company;
    private String site;
    private String warehouse;
    private Movementtype type;
    private String priority;
    private String productId;
    private String supplierId;
    private Integer quantity;
    private String uom;
    private String locationfrom;
    private String locationto;
    private LocalDateTime progresstimestamp;
    private String progressuser;
    private String location;
    private String state;
    private String handleduser;
    private String palleteNummer;

    @ManyToOne
    @JoinColumn(name = "picking_list_ID")
    @JsonBackReference
    private Pickinglist pickinglist;

    @ManyToMany
    private List<Stock> stock=new ArrayList<>();

    public Long getMovementId() {
        return movementId;
    }

    public void setMovementId(Long movement_ID) {
        this.movementId = movement_ID;
    }

    public String getHandleduser() {
        return handleduser;
    }

    public void setHandleduser(String handled_user) {
        this.handleduser = handled_user;
    }

    public String getPalleteNummer() {
        return palleteNummer;
    }

    public void setPalleteNummer(String palleteNummer) {
        this.palleteNummer = palleteNummer;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String wms_company) {
        this.company = wms_company;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String wms_site) {
        this.site = wms_site;
    }

    public String getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(String wms_warehouse) {
        this.warehouse = wms_warehouse;
    }

    public Movementtype getType() {
        return type;
    }

    public void setType(Movementtype movement_type) {
        this.type = movement_type;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String product_ID) {
        this.productId = product_ID;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplier_ID) {
        this.supplierId = supplier_ID;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public String getLocationfrom() {
        return locationfrom;
    }

    public void setLocationfrom(String location_from) {
        this.locationfrom = location_from;
    }

    public String getLocationto() {
        return locationto;
    }

    public void setLocationto(String location_to) {
        this.locationto = location_to;
    }

    public LocalDateTime getProgresstimestamp() {
        return progresstimestamp;
    }

    public void setProgresstimestamp(LocalDateTime in_progress_timestamp) {
        this.progresstimestamp = in_progress_timestamp;
    }

    public String getProgressuser() {
        return progressuser;
    }

    public void setProgressuser(String in_progress_user) {
        this.progressuser = in_progress_user;
    }

    public Pickinglist getPickinglist() {
        return pickinglist;
    }

    public void setPickinglist(Pickinglist pickinglist) {
        this.pickinglist = pickinglist;
    }

    public List<Stock> getStock() {
        return stock;
    }

    public void setStock(List<Stock> stock) {
        this.stock = stock;
    }

    public int getStock(String product_ID){
        int stocks=0;
        for (Stock s: getStock()
             ) {
                    if(s.getProductID().equals(product_ID) && s.getLocation().equals(getLocation())){
                        stocks=s.getQuantity();
            }
        }
        return stocks;
    }
}