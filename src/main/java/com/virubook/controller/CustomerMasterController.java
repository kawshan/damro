package com.virubook.controller;

import com.virubook.dao.CustomerMasterDao;
import com.virubook.entity.CustomerMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/customer-master")
public class CustomerMasterController {

    @Autowired
    private CustomerMasterDao customerMasterDao;

    @GetMapping(value = "/findall")
    public List<CustomerMaster> listCustomerMaster() {
        return customerMasterDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping
    public ModelAndView customerMasterView(){
        ModelAndView customerMasterUI = new ModelAndView();
        customerMasterUI.setViewName("customerMaster.html");
        return customerMasterUI;
    }


    @PostMapping
    public String saveCustomerMaster(@RequestBody CustomerMaster customerMaster) {
        try {

            String maxCustomerCode = customerMasterDao.getMaxCustomerCode();
            if (maxCustomerCode == null || maxCustomerCode.equals(" ")) {
                customerMaster.setCustomer_code("CM0001");
            }
            customerMaster.setCustomer_code(maxCustomerCode);


            CustomerMaster existingCustomer = customerMasterDao.getCustomerMasterByCustomerNameAndCustomerMobile(customerMaster.getCustomer_mobile());
            if (existingCustomer != null) {
                return "customer is already exists";
            }



            customerMasterDao.save(customerMaster);
            return "ok";
        }catch (Exception e){
            return "customer save failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updateCustomerMaster(@RequestBody CustomerMaster customerMaster) {
        try {
            customerMasterDao.save(customerMaster);
            return "ok";
        }catch (Exception e){
            return "customer update failed"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteCustomerMaster(@RequestBody CustomerMaster customerMaster) {
        try {
            customerMaster.setCustomer_status(false);
            customerMasterDao.save(customerMaster);
            return "ok";
        }catch (Exception e){
            return "customer delete failed"+e.getMessage();
        }
    }


    @GetMapping(value = "/getCustomerByMobile/{mobile}")
    public CustomerMaster getCustomerByMobile(@PathVariable("mobile") String mobile) {
        return customerMasterDao.getCustomerMasterByCustomerMobile(mobile);
    }




}
