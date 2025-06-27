package com.virubook.dao;

import com.virubook.entity.InvoiceHeaderMaster;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceHeaderMasterDao extends JpaRepository<InvoiceHeaderMaster,Integer> {

    @Query(value = "select ihm from InvoiceHeaderMaster ihm order by ihm.id limit 100")
    public List<InvoiceHeaderMaster> findAllInvoiceHeaderMasterLimit100();


    @Query(value = "select concat('IN',lpad(max(substring(invoice_header_key,3))+1,4,'0')) as max_invoice_code from invoice_header_master;",nativeQuery = true)
    public String findMaxInvoiceCode();

    @Query(value = "select ihm from InvoiceHeaderMaster ihm where ihm.invoice_header_number=?1")
    public InvoiceHeaderMaster findByInvoiceHeaderNumber(String invoiceHeaderNumber);


    @Query(value = "select id from invoice_header_master where invoice_header_key=?1",nativeQuery = true)
    public String findIdByInvoiceHeaderKey(String invoiceHeaderKey);


    @Query(value = "select max(invoice_header_number)+1 from invoice_header_master as next_invoice_Number;",nativeQuery = true)
    public String getNextInvoiceNumber();


    @Transactional
    @Modifying
    @Query(value = "delete from invoice_detail where invoice_detail_header_key=?1;",nativeQuery = true)
    public void deleteInvoiceDetailByInvoiceHeaderKey(String invoiceHeaderKey);


}
