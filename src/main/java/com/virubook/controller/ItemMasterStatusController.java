package com.virubook.controller;

import com.virubook.dao.ItemMasterStatusDao;
import com.virubook.entity.ItemMasterStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/item-master-status")
public class ItemMasterStatusController {

    @Autowired
    private ItemMasterStatusDao itemMasterStatusDao;

    @GetMapping(value = "/findall")
    public List<ItemMasterStatus> getAllItemMasterStatus() {
        return itemMasterStatusDao.findAll();
    }


}
