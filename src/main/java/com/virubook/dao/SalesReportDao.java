package com.virubook.dao;

import com.virubook.entity.CustomerMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SalesReportDao extends JpaRepository<CustomerMaster,Integer> {


    @Query(value = "SELECT ihm.invoice_header_date AS invoice_date, ihm.invoice_header_key AS invoice_key, ihm.invoice_header_number AS invoice_number, cm.customer_name, ihm.invoice_header_master_pay_type AS payment_type, SUM(id.invoice_detail_value) AS total_invoice_value FROM invoice_header_master ihm INNER JOIN invoice_detail id ON ihm.invoice_header_key = id.invoice_detail_header_key INNER JOIN customer_master cm ON ihm.customer_master_id = cm.id WHERE ihm.invoice_header_date BETWEEN ?1 AND ?2 GROUP BY ihm.invoice_header_date, ihm.invoice_header_key, ihm.invoice_header_number, cm.customer_name, ihm.invoice_header_master_pay_type ORDER BY ihm.invoice_header_date ASC;",nativeQuery = true)
    public List<Object[]> getSalesReport(String fromDate, String toDate);





}
