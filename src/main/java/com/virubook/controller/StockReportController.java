package com.virubook.controller;

import com.virubook.dao.StockReportDao;
import com.virubook.dto.StockReportDto;
import com.virubook.dto.StockReportDtoForAllItems;
import com.virubook.service.StockReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/stock-report")
public class StockReportController {

    @Autowired
    private StockReportService stockReportService;

    @Autowired
    private StockReportDao stockReportDao;


    @GetMapping(value = "/view")
    public ModelAndView StockReportView(){
        ModelAndView stockReportUi = new ModelAndView();
        stockReportUi.setViewName("stockReport.html");
        return stockReportUi;
    }


    @GetMapping("/{itemId}/{fromDate}/{toDate}")
    public List<StockReportDto> getStockReport(@PathVariable("itemId") Integer itemId, @PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate ){
        return stockReportService.generateStockReport(itemId, fromDate, toDate);
    }


    @GetMapping(value = "/getPreviousValue/{itemId}/{fromDate}")
    public String getPreviousValue(@PathVariable("itemId")Integer itemId, @PathVariable("fromDate") String fromDate){
        return stockReportDao.getPreviousValue(itemId, fromDate);
    }


    @GetMapping(value = "/forAllItems/{fromDate}/{todate}")
    public List<StockReportDtoForAllItems> getStockReportForAllItems(@PathVariable("fromDate") String fromDate, @PathVariable("todate") String toDate){
        return stockReportService.generateStockReportForAllItems(fromDate, toDate);
    }





}
