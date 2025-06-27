package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "customer_master")
@AllArgsConstructor
@NoArgsConstructor

public class CustomerMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "customer_name")
    private String customer_name;

    @Column(name = "customer_code")
    private String customer_code;

    @Column(name = "customer_mobile")
    private String customer_mobile;

    @Column(name = "customer_email")
    private String customer_email;

    @Column(name = "customer_email_otp")
    private String customer_email_otp;

    @Column(name = "customer_status")
    private Boolean customer_status;

    @Column(name = "customer_master_address")
    private String customer_master_address;

    @ManyToOne
    @JoinColumn(name = "school_master_id", referencedColumnName = "id")
    private SchoolMaster school_master_id;


    @Column(name = "customer_master_school_index_no")
    private String customer_master_school_index_no;




}
