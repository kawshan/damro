package com.virubook.controller;

import com.virubook.dao.ProductionHeaderDao;
import com.virubook.entity.ProductionHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/production-header")
public class ProductionHeaderController {

    @Autowired
    private ProductionHeaderDao productionHeaderDao;


    @GetMapping(value = "/findall")
    public List<ProductionHeader> getAllProductionHeader() {
        return productionHeaderDao.findAll();
    }


    @GetMapping
    public ModelAndView productionHeaderView(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("productionHeader.html");
        return modelAndView;
    }


    @PostMapping
    public ResponseEntity<Object> saveProductionHeader(@RequestBody ProductionHeader productionHeader){
        try {

            String existingProductionHeaderCode = productionHeaderDao.nextProductionHeaderKey();
            if (existingProductionHeaderCode==null || existingProductionHeaderCode.equals("")){
                productionHeader.setProduction_header_key("PRO0001");
            }else {
                productionHeader.setProduction_header_key(existingProductionHeaderCode);
            }


            ProductionHeader savedProductionHeader =  productionHeaderDao.save(productionHeader);
            return ResponseEntity.ok(savedProductionHeader);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping
    public String updateProductionHeader(@RequestBody ProductionHeader productionHeader){
        try {
            productionHeaderDao.save(productionHeader);
            return "ok";
        }catch (Exception e){
            return "Update Note complete"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteProductionHeader(@RequestBody ProductionHeader productionHeader){
        try {
            productionHeaderDao.delete(productionHeader);
            //need to handel details delete
            return "ok";
        }catch (Exception e){
            return "Delete not complete"+e.getMessage();
        }
    }

    @GetMapping(value = "/getLastHundredRows")
    public List<ProductionHeader> getLasHundredProductionHeader() {
        return productionHeaderDao.getLastHundredRows();
    }


    @GetMapping(value = "/getNextProductionNumber")
    public String nextProductionNumber(){
        String nextProductionNumber =  productionHeaderDao.nextProductionHeaderNumber();
        if (nextProductionNumber==null || nextProductionNumber.equals("")){
            return "1001";
        }else {
            return productionHeaderDao.nextProductionHeaderNumber();
        }
    }

    @GetMapping(value = "/getIdFromHeaderKey/{headerKey}")
    public String getIdFromHeaderKey(@PathVariable("headerKey")String headerKey){
        return productionHeaderDao.getIdByProductionHeaderKey(headerKey);
    }







}
