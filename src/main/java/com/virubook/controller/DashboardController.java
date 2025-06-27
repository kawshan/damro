package com.virubook.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping(value = "/dashboard")
public class DashboardController {


    @GetMapping
    public ModelAndView dashBoardView(){
        ModelAndView dashboardUI = new ModelAndView();
        dashboardUI.setViewName("dashboard.html");
        return dashboardUI;
    }




}
