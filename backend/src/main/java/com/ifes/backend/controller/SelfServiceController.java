package com.ifes.backend.controller;

import com.ifes.backend.domain.SelfService;
import com.ifes.backend.persistence.ISelfServiceRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/self-service")
public class SelfServiceController {

    ISelfServiceRepository selfServiceRepository;

    public SelfServiceController(ISelfServiceRepository selfServiceRepository) {
        this.selfServiceRepository = selfServiceRepository;
    }

    @GetMapping("")
    public SelfService getPrecoSelfService(){
        List<SelfService> selfServices = this.selfServiceRepository.findAll();

        return selfServices.get(0);
    }

    @PatchMapping("{id}")
    public void alterarPrecoSelfService(@RequestBody SelfService selfService){
        List<SelfService> selfServices = this.selfServiceRepository.findAll();

        SelfService selfServiceDB = selfServices.get(0);
        selfServiceDB.setPreco(selfService.getPreco());

        this.selfServiceRepository.save(selfServiceDB);
    }
}
