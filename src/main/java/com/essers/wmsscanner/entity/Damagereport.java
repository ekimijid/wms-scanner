package com.essers.wmsscanner.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;


@Entity
public class Damagereport implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    private String productID;
    private String movementID;
    private String description;
    private LocalDateTime timestamp;

    @Lob
    @Column(name = "picByte", length = 1000)
    private byte[] image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public String getMovementID() {
        return movementID;
    }

    public void setMovementID(String movementID) {
        this.movementID = movementID;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
