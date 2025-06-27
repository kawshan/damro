package com.virubook.dao;

import com.virubook.entity.CustomerMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockReportDao extends JpaRepository<CustomerMaster,Integer> {

    @Query(value = "select ph.production_header_date as dates, ph.production_header_number as code, 'production' as col_type, pd.production_details_quantity as item_quantity from production_header as ph inner join production_details as pd on ph.production_header_key=pd.production_details_header_key and pd.item_master_id = ?1 and ph.production_header_date between ?2 and ?3 union all select ihm.invoice_header_date as dates, ihm.invoice_header_number as code, 'invoice' as col_type, idm.invoice_detail_quantity as in_quantity from invoice_header_master as ihm inner join invoice_detail as idm on ihm.invoice_header_key=idm.invoice_detail_header_key and idm.item_master_id = ?1 and ihm.invoice_header_date between ?2 and ?3 union all select sah.stock_adjustment_header_date as dates, sah.stock_adjustment_header_no as code, 'stock' as col_type, sad.stock_adjustment_details_quantity from stock_adjustment_header as sah inner join stock_adjustment_details as sad on sah.stock_adjustment_header_key = sad.stock_adjustment_details_header_key and sad.item_master_id = ?1 and sah.stock_adjustment_header_date between ?2 and ?3 order by dates asc;" ,nativeQuery = true)
    public List<Object[]> getStockReport(Integer itemNumber, String fromDate, String toDate);


    @Query(value = "select (select coalesce(sum(pd.production_details_quantity),0) from production_header as ph inner join production_details as pd on ph.production_header_key = pd.production_details_header_key and pd.item_master_id = ?1 and ph.production_header_date < ?2) - (select coalesce(sum(idm.invoice_detail_quantity),0) from invoice_header_master as ihm inner join invoice_detail as idm on ihm.invoice_header_key = idm.invoice_detail_header_key and idm.item_master_id=?1 and ihm.invoice_header_date < ?2) + (select coalesce(sum(stock_adjustment_details_quantity),0) from stock_adjustment_header as sah inner join stock_adjustment_details as sad on sah.stock_adjustment_header_key = sad.stock_adjustment_details_header_key and sad.item_master_id=?1 and sah.stock_adjustment_header_date < ?2) as previous_value;",nativeQuery = true)
    public String getPreviousValue(Integer itemId, String fromDate);


    @Query(value = "SELECT combined.item_master_id, icm.item_category_name, im.item_short_name, SUM(combined.quantity_change) AS stock_quantity FROM ( SELECT pd.item_master_id, pd.production_details_quantity AS quantity_change FROM production_details pd INNER JOIN item_master im ON pd.item_master_id = im.id WHERE pd.production_details_header_key IN ( SELECT ph.production_header_key FROM production_header ph WHERE ph.production_header_date BETWEEN ?1 AND ?2 ) UNION ALL SELECT idm.item_master_id, -idm.invoice_detail_quantity AS quantity_change FROM invoice_detail idm INNER JOIN item_master im ON idm.item_master_id = im.id WHERE idm.invoice_detail_header_key IN ( SELECT ihm.invoice_header_key FROM invoice_header_master ihm WHERE ihm.invoice_header_date BETWEEN ?1 AND ?2 ) UNION ALL SELECT sad.item_master_id, sad.stock_adjustment_details_quantity AS quantity_change FROM stock_adjustment_details sad INNER JOIN item_master im ON sad.item_master_id = im.id WHERE sad.stock_adjustment_details_header_key IN ( SELECT sah.stock_adjustment_header_key FROM stock_adjustment_header sah WHERE sah.stock_adjustment_header_date BETWEEN ?1 AND ?2 ) ) AS combined INNER JOIN item_master im ON combined.item_master_id = im.id INNER JOIN item_category_master icm ON im.item_category_master_id = icm.id GROUP BY combined.item_master_id, icm.item_category_name ORDER BY icm.item_category_name, combined.item_master_id;",nativeQuery = true)
    public List<Object[]> getStockReportForAllItems(String fromDate, String toDate);


}
