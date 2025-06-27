package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "stock_adjustment_details")
@AllArgsConstructor
@NoArgsConstructor
public class StockAdjustmentDetails {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "stock_adjustment_details_quantity")
    private BigDecimal stock_adjustment_details_quantity;

    @Column(name = "stock_adjustment_details_description")
    private String stock_adjustment_details_description;

    @Column(name = "stock_adjustment_details_rate")
    private BigDecimal stock_adjustment_details_rate;

    @Column(name = "stock_adjustment_details_header_key")
    private String stock_adjustment_details_header_key;

    @ManyToOne
    @JoinColumn(name = "item_master_id",referencedColumnName = "id")
    private ItemMaster item_master_id;





}