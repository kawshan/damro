package com.virubook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class SalesReportDto {

    private Date invoice_date;
    private String invoice_key;
    private String invoice_number;
    private String customer_name;
    private String payment_type;
    private BigDecimal total_invoice_value;



}
