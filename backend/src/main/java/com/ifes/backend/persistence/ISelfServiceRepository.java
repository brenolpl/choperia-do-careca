package com.ifes.backend.persistence;

import com.ifes.backend.domain.SelfService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISelfServiceRepository extends JpaRepository<SelfService, Integer> {
}
