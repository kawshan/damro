package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "item_category_master")
@AllArgsConstructor
@NoArgsConstructor
public class ItemCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "item_category_name")
    private String item_category_name;

    @Column(name = "item_category_code")
    private String item_category_code;

    @Column(name = "item_category_status")
    private Boolean item_category_status;

    @Column(name = "item_category_added_date_time")
    private LocalDateTime item_category_added_date_time;

    @Column(name = "item_category_delete_date_time")
    private LocalDateTime item_category_delete_date_time;

    @Column(name = "item_category_update_date_time")
    private LocalDateTime item_category_update_date_time;







}
