package com.hms.user.utility;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hms.user.exception.HmsException;

@RestControllerAdvice
public class ExceptionControllerAdvice {
    @Autowired
    org.springframework.core.env.Environment environment;
     @ExceptionHandler(Exception.class)
     public ResponseEntity<ErrorInfo> exceptionHandler(Exception e){
        ErrorInfo  error = new ErrorInfo("Some error occurred.",HttpStatus.INTERNAL_SERVER_ERROR.value(),LocalDateTime.now());
        return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(HmsException.class)
    public ResponseEntity<ErrorInfo> HmsExceptionHandler(HmsException e){
        ErrorInfo  error = new ErrorInfo(environment.getProperty(e.getMessage()),
        HttpStatus.INTERNAL_SERVER_ERROR.value(),LocalDateTime.now());
        return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
