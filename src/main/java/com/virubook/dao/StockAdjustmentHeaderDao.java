package com.virubook.dao;

import com.virubook.entity.StockAdjustmentHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockAdjustmentHeaderDao extends JpaRepository<StockAdjustmentHeader,Integer> {

    @Query(value = "select sh from StockAdjustmentHeader sh order by sh.id desc limit 1000")
    public List<StockAdjustmentHeader> getRecent1000StockAdjustmentHeaders();

    @Query(value = "select sh from StockAdjustmentHeader sh where sh.stock_adjustment_header_no=?1")
    public StockAdjustmentHeader getStockAdjustmentHeaderByHeaderNo(String headerNo);

    @Query(value = "select concat('ADJ',lpad(max(substring(stock_adjustment_header_key,4))+1,4,'0')) as max_stock_adjustment_header_key from stock_adjustment_header;",nativeQuery = true)
    public String getMaxStockAdjustmentHeaderKey();

    @Query(value = "select id from stock_adjustment_header where stock_adjustment_header_key=?1;",nativeQuery = true)
    public String getStockAdjustmentHeaderIdFromHeaderKey(String id);

    @Query(value = "select max(stock_adjustment_header_no)+1 from stock_adjustment_header as next_stock_adjustment_number;",nativeQuery = true)
    public Integer getNextStockAdjustmentNumber();


}
