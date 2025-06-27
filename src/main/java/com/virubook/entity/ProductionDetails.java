package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "production_details")
@AllArgsConstructor
@NoArgsConstructor
public class ProductionDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "production_details_quantity")
    private BigDecimal production_details_quantity;

    @Column(name = "production_details_header_key")
    private String production_details_header_key;

    @Column(name = "production_details_description")
    private String production_details_description;

    @ManyToOne
    @JoinColumn(name = "item_master_id",referencedColumnName = "id")
    private ItemMaster item_master_id;



}
