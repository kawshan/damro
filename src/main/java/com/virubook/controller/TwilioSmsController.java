package com.virubook.controller;

import com.virubook.service.TwilioSmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/sms")
public class TwilioSmsController {

    @Autowired
    private TwilioSmsService twilioSmsService;


    @PostMapping(value = "/send")
    private String sendSms(@RequestParam String phone, @RequestParam String message){
        twilioSmsService.sendSms(phone, message);
        return "sms sent successfully";
    }
}
