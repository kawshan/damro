package com.virubook.dao;

import com.virubook.entity.ItemMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemMasterDao extends JpaRepository<ItemMaster,Integer> {

    @Query(value = "select im from ItemMaster im where im.item_name=?1 and im.item_category_master_id.item_category_name=?2")
    public ItemMaster findByItemName(String itemName, String categoryName);

    @Query(value = "select concat('IM',lpad(max(substring(item_key,3))+1,4,'0'))as max_item_master_key from item_master",nativeQuery = true)
    public String findMaxItemMasterCode();

    @Query(value = "select im from ItemMaster im order by im.item_category_master_id.item_category_name asc")
    public List<ItemMaster> listItemsForItemMasterPrint();

    @Query(value = "select im from ItemMaster im where im.item_barcode=?1")
    public ItemMaster findByBarcode(String barcode);

}
