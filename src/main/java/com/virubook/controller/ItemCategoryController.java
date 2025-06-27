package com.virubook.controller;

import com.virubook.dao.ItemCategoryDao;
import com.virubook.entity.ItemCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/item-category")
public class ItemCategoryController {

    @Autowired
    private ItemCategoryDao itemCategoryDao;


    @GetMapping(value = "/findall")
    public List<ItemCategory>findAllItemCategory(){
        return itemCategoryDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping
    public ModelAndView itemCategoryView(){
        ModelAndView itemCategoryUI = new ModelAndView();
        itemCategoryUI.setViewName("itemcategory.html");
        return itemCategoryUI;
    }


    @PostMapping
    public String saveItemCategory(@RequestBody ItemCategory itemCategory){
        try {
            String getMaxItemCategoryCode = itemCategoryDao.findMaxItemCategoryCode();
            if (getMaxItemCategoryCode==null || getMaxItemCategoryCode.equals(" ")){
                itemCategory.setItem_category_code("IM0001");
            }else {
                itemCategory.setItem_category_code(getMaxItemCategoryCode);
            }

            ItemCategory existingItemCategory = itemCategoryDao.findByItemCategoryName(itemCategory.getItem_category_name());
            if(existingItemCategory != null){
                return "cannot save item category already exist";
            }

            itemCategoryDao.save(itemCategory);
            return "ok";
        }catch (Exception e){
            return "item Category Not Saved"+e.getMessage();
        }
    }


    @PutMapping
    public String updateItemCategory(@RequestBody ItemCategory itemCategory){
        try {
            itemCategoryDao.save(itemCategory);
            return "ok";
        }catch (Exception e){
            return "item Category Not Saved"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteItemCategory(@RequestBody ItemCategory itemCategory){
        try {
            itemCategory.setItem_category_status(false);
            itemCategoryDao.save(itemCategory);
            return "ok";
        }catch (Exception e){
            return "item Category Not Deleted"+e.getMessage();
        }
    }



}
