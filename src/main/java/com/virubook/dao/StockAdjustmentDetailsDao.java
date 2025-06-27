package com.virubook.dao;

import com.virubook.entity.StockAdjustmentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockAdjustmentDetailsDao extends JpaRepository<StockAdjustmentDetails, Integer> {


    @Query(value = "select sd from StockAdjustmentDetails sd where sd.stock_adjustment_details_header_key=?1")
    public List<StockAdjustmentDetails> getStockAdjustmentDetailsByHeaderKey(String headerKey);




}
