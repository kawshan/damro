package com.virubook.controller;

import com.virubook.dao.SchoolMasterDao;
import com.virubook.entity.SchoolMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/school-master")
public class SchoolMasterController {

    @Autowired
    private SchoolMasterDao schoolMasterDao;

    @GetMapping(value = "/findAll")
    public List<SchoolMaster> getAllSchoolMaster() {
        return schoolMasterDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping
    public ModelAndView schoolMasterView(){
        ModelAndView schoolUI = new ModelAndView();
        schoolUI.setViewName("schoolMaster.html");
        return schoolUI;
    }


    @PostMapping
    public String saveSchoolMaster(@RequestBody SchoolMaster schoolMaster){
        try {
            schoolMasterDao.save(schoolMaster);
            return "ok";
        }catch (Exception e){
            return "save schoolMaster failed"+e.getMessage();
        }
    }

    @PutMapping
    public String updateSchoolMaster(@RequestBody SchoolMaster schoolMaster){
        try {
            schoolMasterDao.save(schoolMaster);
            return "ok";
        }catch (Exception e){
            return "update schoolMaster failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteSchoolMaster(@RequestBody SchoolMaster schoolMaster){
        try {
            schoolMaster.setSchool_master_status(false);
            schoolMasterDao.save(schoolMaster);
            return "ok";
        }catch (Exception e){
            return "delete schoolMaster failed"+e.getMessage();
        }
    }




}
