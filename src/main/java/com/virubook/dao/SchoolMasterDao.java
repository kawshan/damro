package com.virubook.dao;

import com.virubook.entity.SchoolMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolMasterDao extends JpaRepository<SchoolMaster,Integer> {
}
