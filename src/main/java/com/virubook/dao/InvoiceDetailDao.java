package com.virubook.dao;

import com.virubook.entity.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceDetailDao extends JpaRepository<InvoiceDetail,Integer> {


    @Query(value = "select ind from InvoiceDetail ind where ind.invoice_detail_header_key=?1 order by ind.id desc ")
    public List<InvoiceDetail> getAllByInvoiceHeader(String headerKey);

    @Query(value = "select sum(invoice_detail_rate*invoice_detail_quantity) as gross_value from invoice_detail  where invoice_detail_header_key=?1",nativeQuery = true)
    public String getGrossValue(String headerKey);

    @Query(value = "select coalesce(sum(invoice_detail_discount),0) as total_discount from invoice_detail  where invoice_detail_header_key=?1",nativeQuery = true)
    public String getTotalDiscount(String headerKey);

    @Query(value = "select sum(invoice_detail_value) as net_value from invoice_detail where invoice_detail_header_key=?1",nativeQuery = true)
    public String getNetValue(String headerKey);




}
