package com.virubook.dao;

import com.virubook.entity.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemCategoryDao extends JpaRepository<ItemCategory,Integer> {


    @Query(value = "select ic from ItemCategory ic where ic.item_category_name=?1")
    public ItemCategory findByItemCategoryName(String itemCategoryName);


    @Query(value = "select concat('IC',lpad(max(substring(item_category_code,3))+1,4,'0' ))as max_item_category_code from item_category_master;",nativeQuery = true)
    public String findMaxItemCategoryCode();



}
