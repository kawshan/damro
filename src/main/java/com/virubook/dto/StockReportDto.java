package com.virubook.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockReportDto {

    private Date dates;
    private String code;
    private String colType;
    private BigDecimal itemQuantity;


}
