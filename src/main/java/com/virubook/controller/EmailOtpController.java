package com.virubook.controller;

import com.virubook.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailOtpController {

    @Autowired
    private EmailService emailService;


    @GetMapping("/email/{email}")
    public String userEmail(@PathVariable("email") String email) {
        String otp = generateOtp();
        emailService.sendOtpMail(email,otp);
        return otp;
    }



    private String generateOtp(){
        int otp = (int) (Math.random()*9000)+1000;
        return String.valueOf(otp);
    }




}
