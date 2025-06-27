package com.virubook.controller;

import com.virubook.dao.ItemSizeDao;
import com.virubook.entity.ItemSize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/item-size")
public class ItemSizeController {

    @Autowired
    private ItemSizeDao itemSizeDao;

    @GetMapping(value = "/findall")
    public List<ItemSize> findAllItemSizes(){
        return itemSizeDao.findAll();
    }



}
