package com.virubook.dao;

import com.virubook.entity.ProductionDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductionDetailsDao extends JpaRepository<ProductionDetails,Integer> {


    @Query(value = "select pd from ProductionDetails pd where pd.production_details_header_key=?1")
    public List<ProductionDetails> findByProductionDetailsHeaderKey(String headerKey);


}
