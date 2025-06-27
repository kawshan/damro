package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "ordersheet_header")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderSheetHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "ordersheet_header_discount")
    private BigDecimal ordersheet_header_discount;

    @Column(name = "ordersheet_header_code")
    private String ordersheet_header_code;

    @Column(name = "ordersheet_header_number")
    private Integer ordersheet_header_number;

    @Column(name = "ordersheet_header_date")
    private LocalDate ordersheet_header_date;

    @Column(name = "ordersheet_header_payment_type")
    private String ordersheet_header_payment_type;

    @Column(name = "added_user")
    private String added_user;

    @Column(name = "update_user")
    private String update_user;

    @Column(name = "delete_user")
    private String delete_user;


    @ManyToOne
    @JoinColumn(name = "customer_master_id", referencedColumnName = "id")
    private CustomerMaster customer_master_id;










}
