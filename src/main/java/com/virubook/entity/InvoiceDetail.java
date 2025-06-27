package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor


public class InvoiceDetail {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "invoice_detail_header_key")
    private String invoice_detail_header_key;

    @Column(name = "invoice_detail_quantity")
    private BigDecimal invoice_detail_quantity;

    @Column(name = "invoice_detail_rate")
    private BigDecimal invoice_detail_rate;

    @Column(name = "invoice_detail_value")
    private BigDecimal invoice_detail_value;


    @Column(name = "invoice_detail_discount")
    private BigDecimal invoice_detail_discount;


    @ManyToOne
    @JoinColumn(name = "item_master_id",referencedColumnName = "id")
    private ItemMaster item_master_id;







}
