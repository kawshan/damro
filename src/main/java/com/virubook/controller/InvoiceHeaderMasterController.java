package com.virubook.controller;

import com.virubook.dao.InvoiceHeaderMasterDao;
import com.virubook.entity.InvoiceHeaderMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/invoice-header")
public class InvoiceHeaderMasterController {

    @Autowired
    private InvoiceHeaderMasterDao invoiceHeaderMasterDao;

    @GetMapping
    public ModelAndView invoiceHeaderMasterView(){
        ModelAndView invoiceMasterUI = new ModelAndView();
        invoiceMasterUI.setViewName("invoiceMaster.html");
        return invoiceMasterUI;
    }


    @GetMapping(value = "/findall")
    public List<InvoiceHeaderMaster> findAllInvoiceHeaderMasters(){
        return invoiceHeaderMasterDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping(value = "/findall-limit-100")
    public List<InvoiceHeaderMaster> findAllInvoiceHeaderMastersLimit100(){
        return invoiceHeaderMasterDao.findAllInvoiceHeaderMasterLimit100();
    }


    @PostMapping
    public ResponseEntity<Object> saveInvoiceHeaderMaster(@RequestBody InvoiceHeaderMaster invoiceHeaderMaster){
        try {

            InvoiceHeaderMaster existingInvoiceHeaderMaster = invoiceHeaderMasterDao.findByInvoiceHeaderNumber(invoiceHeaderMaster.getInvoice_header_number());
            if(existingInvoiceHeaderMaster != null){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invoice Number Already exists");
            }


            String maxInvoiceHeaderCode = invoiceHeaderMasterDao.findMaxInvoiceCode();
            if (maxInvoiceHeaderCode == null || maxInvoiceHeaderCode.equals("")) {
                invoiceHeaderMaster.setInvoice_header_key("IN0001");
            }else {
                invoiceHeaderMaster.setInvoice_header_key(maxInvoiceHeaderCode);
            }

            InvoiceHeaderMaster savedInvoiceHeaderMaster = invoiceHeaderMasterDao.save(invoiceHeaderMaster);
            return ResponseEntity.ok(savedInvoiceHeaderMaster);


        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping
    public String updateInvoiceHeaderMaster(@RequestBody InvoiceHeaderMaster invoiceHeaderMaster){
        try {
            invoiceHeaderMasterDao.save(invoiceHeaderMaster);
            return "ok";
        }catch (Exception e){
            return "Update Unsuccessful"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteInvoiceHeaderMaster(@RequestBody InvoiceHeaderMaster invoiceHeaderMaster){
        try {
            //need to do details delete thing........
            invoiceHeaderMasterDao.deleteInvoiceDetailByInvoiceHeaderKey(invoiceHeaderMaster.getInvoice_header_key());
            invoiceHeaderMasterDao.delete(invoiceHeaderMaster);
            return "ok";
        }catch (Exception e){
            return "Delete Unsuccessful"+e.getMessage();
        }
    }




    @GetMapping(value = "/findIdByHeaderKey/{headerKey}")
    public String getIdFromHeaderKey(@PathVariable("headerKey")String headerKey){
        return invoiceHeaderMasterDao.findIdByInvoiceHeaderKey(headerKey);
    }



    @GetMapping(value = "/getNextInvoiceNumber")
    public String getNextInvoiceNumber(){
        String nextInvoiceNumber = invoiceHeaderMasterDao.getNextInvoiceNumber();
        if(nextInvoiceNumber == null || nextInvoiceNumber.equals("")){
            return "1001";
        }else {
            return nextInvoiceNumber;
        }
    }


}
