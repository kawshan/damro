package com.virubook.dao;

import com.virubook.entity.OrderSheetHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderSheetHeaderDao extends JpaRepository<OrderSheetHeader, Integer> {


    @Query(value = "select id from ordersheet_header where ordersheet_header_code=?1", nativeQuery = true)
    public String getIdFromOrderSheetHeader(String orderSheetHeaderCode);


    @Query(value = "select concat('ODR',lpad(max(substring(ordersheet_header_code,4))+1,4,'0')) as max_heade_code from ordersheet_header", nativeQuery = true)
    public String maxHeaderCodeFromOrderSheetHeader();

    @Query(value = "select max(ordersheet_header_number)+1 from ordersheet_header as next_order_number;",nativeQuery = true)
    public Integer maxNextOrderNumberFromOrderSheetHeader();


}
