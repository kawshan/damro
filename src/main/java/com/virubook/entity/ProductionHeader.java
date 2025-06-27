package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "production_header")
@AllArgsConstructor
@NoArgsConstructor
public class ProductionHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "production_header_date")
    private LocalDate production_header_date;

    @Column(name = "production_header_number")
    private String production_header_number;

    @Column(name = "production_header_key")
    private String production_header_key;





}
