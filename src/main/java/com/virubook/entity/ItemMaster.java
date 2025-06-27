package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "item_master")
@AllArgsConstructor
@NoArgsConstructor
public class ItemMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "item_key")
    private String item_key;

    @Column(name = "item_code")
    private String item_code;

    @Column(name = "item_name")
    private String item_name;

    @Column(name = "item_description")
    private String item_description;

    @Column(name = "item_barcode")
    private String item_barcode;

    @Column(name = "item_short_name")
    private String item_short_name;

    @Column(name = "number_of_pages")
    private BigDecimal number_of_pages;

    @Column(name = "item_books_in_pack")
    private BigDecimal item_books_in_pack;

    @Column(name = "item_packs_in_box")
    private BigDecimal item_packs_in_box;

    @Column(name = "item_cost")
    private BigDecimal item_cost;

    @Column(name = "item_price")
    private BigDecimal item_price;

    @ManyToOne
    @JoinColumn(name = "item_category_master_id",referencedColumnName = "id")
    private ItemCategory item_category_master_id;

    @ManyToOne
    @JoinColumn(name = "item_size_id",referencedColumnName = "id")
    private ItemSize item_size_id;

    @ManyToOne
    @JoinColumn(name = "item_master_status_id",referencedColumnName = "id")
    private ItemMasterStatus item_master_status_id;

}