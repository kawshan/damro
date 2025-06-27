package com.virubook.controller;

import com.virubook.dao.ProductionDetailsDao;
import com.virubook.entity.ProductionDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/production-details")
public class ProductionDetailsController {

    @Autowired
    private ProductionDetailsDao productionDetailsDao;

    @GetMapping(value = "/findall")
    public List<ProductionDetails> findAllProductionDetails() {
        return productionDetailsDao.findAll();
    }

    @PostMapping
    public String saveProductionDetails(@RequestBody ProductionDetails productionDetails) {
        try {
            productionDetailsDao.save(productionDetails);
            return "ok";
        }catch (Exception e) {
            return "save production details failed"+e.getMessage();
        }
    }

    @PutMapping
    public String updateProductionDetails(@RequestBody ProductionDetails productionDetails) {
        try {
            productionDetailsDao.save(productionDetails);
            return "ok";
        }catch (Exception e) {
            return "update production details failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteProductionDetails(@RequestBody ProductionDetails productionDetails) {
        try {
            productionDetailsDao.delete(productionDetails);
            return "ok";
        }catch (Exception e) {
            return "delete production details failed"+e.getMessage();
        }
    }


    @GetMapping(value = "/findByHeaderKey/{headerKey}")
    public List<ProductionDetails> findAllByProductionDetailsHeaderKey(@PathVariable("headerKey")String headerKey) {
        return productionDetailsDao.findByProductionDetailsHeaderKey(headerKey);
    }




}
