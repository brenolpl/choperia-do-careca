package com.ifes.backend.persistence;

import com.ifes.backend.domain.CartaoRFID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICartaoRFIDRepository extends JpaRepository<CartaoRFID, String> {
}
