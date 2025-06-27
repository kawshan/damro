package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "invoice_header_master")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceHeaderMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "invoice_header_number")
    private String invoice_header_number;

    @Column(name = "invoice_header_key")
    private String invoice_header_key;

    @Column(name = "invoice_header_date")
    private LocalDate invoice_header_date;

    @Column(name = "invoice_header_po_number")
    private String invoice_header_po_number;

    @Column(name = "invoice_header_dispatch_number")
    private String invoice_header_dispatch_number;

    @Column(name = "invoice_header_discount")
    private BigDecimal invoice_header_discount;

    @Column(name = "invoice_header_master_pay_type")
    private String invoice_header_master_pay_type;


    @ManyToOne
    @JoinColumn(name = "customer_master_id",referencedColumnName = "id")
    private CustomerMaster customer_master_id;
















}
