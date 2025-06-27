package com.virubook.controller;

import com.virubook.dao.StockAdjustmentHeaderDao;
import com.virubook.entity.StockAdjustmentHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "stockAdjustmentHeader")
public class StockAdjustmentHeaderController {

    @Autowired
    private StockAdjustmentHeaderDao stockAdjustmentHeaderDao;

    @GetMapping(value = "/findall")
    public List<StockAdjustmentHeader> findAllStockAdjustmentHeaders(){
        return stockAdjustmentHeaderDao.findAll();
    }

    @GetMapping(value = "/recent1000StockAdjustments")
    public List<StockAdjustmentHeader> findRecent1000StockAdjustments(){
        return stockAdjustmentHeaderDao.getRecent1000StockAdjustmentHeaders();
    }


    @GetMapping
    public ModelAndView stockAdjustmentView(){
        ModelAndView stockAdjustmentUI = new ModelAndView();
        stockAdjustmentUI.setViewName("stockAdjustmentMaster.html");
        return stockAdjustmentUI;
    }


    @PostMapping
    public ResponseEntity<Object> saveStockAdjustmentHeader(@RequestBody StockAdjustmentHeader stockAdjustmentHeader){
        try {

            String maxHeaderKey = stockAdjustmentHeaderDao.getMaxStockAdjustmentHeaderKey();
            if (maxHeaderKey==null || maxHeaderKey.equals("")){
                stockAdjustmentHeader.setStock_adjustment_header_key("ADJ1001");
            }else {
                stockAdjustmentHeader.setStock_adjustment_header_key(maxHeaderKey);
            }

            Integer maxNumber = stockAdjustmentHeaderDao.getNextStockAdjustmentNumber();
            if (maxNumber==null || maxNumber.equals("")){
                stockAdjustmentHeader.setStock_adjustment_header_no(1001);
            }else {
                stockAdjustmentHeader.setStock_adjustment_header_no(maxNumber);
            }



            StockAdjustmentHeader savedStockAdjustmentHeader = stockAdjustmentHeaderDao.save(stockAdjustmentHeader);
            return ResponseEntity.ok(savedStockAdjustmentHeader);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping
    public String updateStockAdjustmentHeader(@RequestBody StockAdjustmentHeader stockAdjustmentHeader){
        try {
            stockAdjustmentHeaderDao.save(stockAdjustmentHeader);
            return "ok";
        }catch (Exception e){
            return "Update Stock Adjustment Header Failed"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteStockAdjustmentHeader(@RequestBody StockAdjustmentHeader stockAdjustmentHeader){
        try {
            //need to take care of stock adjustment details also
            stockAdjustmentHeaderDao.delete(stockAdjustmentHeader);
            return "ok";
        }catch (Exception e){
            return "Delete Stock Adjustment Header Failed"+e.getMessage();
        }
    }


    @GetMapping(value = "/getIdFromHeaderKey/{headerKey}")
    public String getIdFromHeaderKey(@PathVariable("headerKey")String headerKey){
        return stockAdjustmentHeaderDao.getStockAdjustmentHeaderIdFromHeaderKey(headerKey);
    }





}
