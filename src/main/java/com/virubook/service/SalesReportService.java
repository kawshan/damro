package com.virubook.service;


import com.virubook.dao.SalesReportDao;
import com.virubook.dto.SalesReportDto;
import com.virubook.dto.StockReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class SalesReportService {

    @Autowired
    private SalesReportDao salesReportDao;



    public List<SalesReportDto> generateSalesReport(String fromDate, String toDate) {
        List<Object[]> results = salesReportDao.getSalesReport(fromDate, toDate);
        return results.stream().map(obj->
                new SalesReportDto(
                        (Date) obj[0],
                        (String) obj[1],
                        (String) obj[2],
                        (String) obj[3],
                        (String) obj[4],
                        (BigDecimal) obj[5]
                )
                ).collect(Collectors.toList());
    }



}
