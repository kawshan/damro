package com.virubook.controller;

import com.virubook.dao.OrderSheetHeaderDao;
import com.virubook.entity.OrderSheetHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/order-sheet")

public class OrderSheetHeaderController {


    @Autowired
    private OrderSheetHeaderDao orderSheetHeaderDao;

    @GetMapping(value = "/view")
    public ModelAndView orderSheetHeaderUI() {
        ModelAndView orderSheetView = new ModelAndView();
        orderSheetView.setViewName("ordersheet.html");
        return orderSheetView;
    }


    @GetMapping(value = "/findall")
    public List<OrderSheetHeader> findAll() {
        return orderSheetHeaderDao.findAll();
    }


    @PostMapping
    public ResponseEntity<Object> saveOrderSheetHeader(@RequestBody OrderSheetHeader orderSheetHeader) {
        try {
            String maxHeaderCode = orderSheetHeaderDao.maxHeaderCodeFromOrderSheetHeader();
            if (maxHeaderCode==null || maxHeaderCode.equals("")) {
                orderSheetHeader.setOrdersheet_header_code("ODR0001");
            }else {
                orderSheetHeader.setOrdersheet_header_code(maxHeaderCode);
            }

            Integer nextHeaderNumber = orderSheetHeaderDao.maxNextOrderNumberFromOrderSheetHeader();
            if (nextHeaderNumber==null || nextHeaderNumber.equals(0)){
                orderSheetHeader.setOrdersheet_header_number(1001);
            }else {
                orderSheetHeader.setOrdersheet_header_number(nextHeaderNumber);
            }

            orderSheetHeader.setAdded_date_time(LocalDateTime.now());
            OrderSheetHeader savedOrderHeader = orderSheetHeaderDao.save(orderSheetHeader);
            return ResponseEntity.ok(savedOrderHeader);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @PutMapping
    public String updateOrderSheetHeader(@RequestBody OrderSheetHeader orderSheetHeader) {
        try {
            orderSheetHeader.setModify_date_time(LocalDateTime.now());
            orderSheetHeaderDao.save(orderSheetHeader);
            return "ok";
        }catch (Exception e){
            return  "update not complete"+e.getMessage();
        }
    }



    @DeleteMapping
    public String deleteOrderSheetHeader(@RequestBody OrderSheetHeader orderSheetHeader) {
        try {
            orderSheetHeaderDao.delete(orderSheetHeader);
            return "ok";
//            need to handel details delete part also
        }catch (Exception e){
            return  "delete not complete"+e.getMessage();
        }
    }




    @GetMapping(value = "/getIdFromHeaderKey/{headerkey}")
    public String getIdFromHeaderKey(@PathVariable("headerkey") String headerkey) {
        return orderSheetHeaderDao.getIdFromOrderSheetHeader(headerkey);
    }



//need to implement order sheet header operations






}