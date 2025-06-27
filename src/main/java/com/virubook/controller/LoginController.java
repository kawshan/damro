package com.virubook.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping(value = "/login")
public class LoginController {

    @GetMapping
    public ModelAndView loginView(){
        ModelAndView loginUI = new ModelAndView();
        loginUI.setViewName("login.html");
        return loginUI;
    }




}
