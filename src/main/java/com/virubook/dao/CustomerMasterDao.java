package com.virubook.dao;

import com.virubook.entity.CustomerMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerMasterDao extends JpaRepository<CustomerMaster,Integer> {

    @Query(value = "select concat('CM',lpad(max(substring(customer_code,3))+1,4,'0'))as max_customer_code from customer_master;",nativeQuery = true)
    public String getMaxCustomerCode();


    @Query(value = "select cm from CustomerMaster cm where cm.customer_mobile=?1")
    public CustomerMaster getCustomerMasterByCustomerNameAndCustomerMobile(String customerMobile);

    @Query(value = "select c from CustomerMaster c where c.customer_mobile=?1")
    public CustomerMaster getCustomerMasterByCustomerMobile(String customerMobile);

}
