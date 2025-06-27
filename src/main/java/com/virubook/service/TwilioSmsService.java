package com.virubook.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioSmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;


    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;


    public void sendSms(String to, String messageBody){

        //initialize twilio with credentials
        Twilio.init(accountSid,authToken);

        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(to),      // Recipient's phone number
                new com.twilio.type.PhoneNumber(twilioPhoneNumber),
                messageBody// Twilio phone number
        ).create();
        System.out.println("sms sent with sid: " + message.getSid());
    }












}