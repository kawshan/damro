package com.virubook.controller;

import com.virubook.dao.InvoiceDetailDao;
import com.virubook.entity.InvoiceDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/invoiceDetail")
public class InvoiceDetailController {

    @Autowired
    private InvoiceDetailDao invoiceDetailDao;


    @GetMapping(value = "/findall")
    public List<InvoiceDetail> findAllInvoiceDetails(){
        return invoiceDetailDao.findAll();
    }

    @PostMapping
    public String saveInvoiceDetail(@RequestBody InvoiceDetail invoiceDetail){
        try {
            invoiceDetailDao.save(invoiceDetail);
            return "ok";
        }catch (Exception e){
            return "Save Invoice Detail Failed"+e.getMessage();
        }
    }

    @PutMapping
    public String updateInvoiceDetail(@RequestBody InvoiceDetail invoiceDetail){
        try {
            invoiceDetailDao.save(invoiceDetail);
            return "ok";
        }catch (Exception e){
            return "Update Invoice Detail Failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteInvoiceDetail(@RequestBody InvoiceDetail invoiceDetail){
        try {
            invoiceDetailDao.delete(invoiceDetail);
            return "ok";
        }catch (Exception e){
            return "Delete Invoice Detail Failed"+e.getMessage();
        }
    }


    @GetMapping(value = "/getFromHeaderKey/{headerKey}")
    public List<InvoiceDetail> getInvoiceDetailFromHeaderKey(@PathVariable String headerKey){
        return  invoiceDetailDao.getAllByInvoiceHeader(headerKey);
    }

    @GetMapping(value = "/getGrossValue/{headerKey}")
    public String getGrossValue(@PathVariable("headerKey")String headerKey){
        return invoiceDetailDao.getGrossValue(headerKey);
    }

    @GetMapping(value = "/getTotalDiscount/{headerKey}")
    public String getTotalDiscount(@PathVariable("headerKey")String headerKey){
        return invoiceDetailDao.getTotalDiscount(headerKey);
    }


    @GetMapping(value = "/getNetValue/{headerKey}")
    public String getNetValue(@PathVariable("headerKey")String headerKey){
        return invoiceDetailDao.getNetValue(headerKey);
    }



}
