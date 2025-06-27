package com.virubook.controller;

import com.virubook.dao.StockAdjustmentDetailsDao;
import com.virubook.entity.StockAdjustmentDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/stockAdjustmentDetails")
public class StockAdjustmentDetailsController {

    @Autowired
    private StockAdjustmentDetailsDao stockAdjustmentDetailsDao;

    @GetMapping(value = "/findAll")
    public List<StockAdjustmentDetails> findAll() {
        return stockAdjustmentDetailsDao.findAll();
    }


    @GetMapping(value = "/findByHeaderKey/{headerKey}")
    public List<StockAdjustmentDetails> findByHeaderKey(@PathVariable("headerKey")String headerKey) {
        return stockAdjustmentDetailsDao.getStockAdjustmentDetailsByHeaderKey(headerKey);
    }


    @PostMapping
    public String saveStockAdjustmentDetails(@RequestBody StockAdjustmentDetails stockAdjustmentDetails) {
        try {
            stockAdjustmentDetailsDao.save(stockAdjustmentDetails);
            return "ok";
        }catch (Exception e) {
            return "Save unsuccessful"+e.getMessage();
        }
    }




    @PutMapping
    public String updateStockAdjustmentDetails(@RequestBody StockAdjustmentDetails stockAdjustmentDetails) {
        try {
            stockAdjustmentDetailsDao.save(stockAdjustmentDetails);
            return "ok";
        }catch (Exception e){
            return "Update unsuccessful"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteStockAdjustmentDetails(@RequestBody StockAdjustmentDetails stockAdjustmentDetails) {
        try {
            stockAdjustmentDetailsDao.delete(stockAdjustmentDetails);
            return "ok";
        }catch (Exception e){
            return "Delete unsuccessful"+e.getMessage();
        }
    }






}
