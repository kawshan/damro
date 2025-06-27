package com.virubook.dao;

import com.virubook.entity.ProductionHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductionHeaderDao extends JpaRepository<ProductionHeader,Integer> {

    @Query(value = "select ph from ProductionHeader ph order by ph.id desc limit 100")
    public List<ProductionHeader> getLastHundredRows();


    @Query(value = "select max(production_header_number)+1 from production_header as next_prduction_number;",nativeQuery = true)
    public String nextProductionHeaderNumber();

    @Query(value = "select concat('PRO',lpad(max(substring(production_header_key,4))+1,4,'0')) as next_header_key from production_header;",nativeQuery = true)
    public String nextProductionHeaderKey();

    @Query(value = "select ph.id from ProductionHeader ph where ph.production_header_key=?1")
    public String getIdByProductionHeaderKey(String productionHeaderKey);



}
