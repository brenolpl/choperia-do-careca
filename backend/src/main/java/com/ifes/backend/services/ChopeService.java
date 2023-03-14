package com.ifes.backend.services;

import com.ifes.backend.domain.Chope;
import com.ifes.backend.persistence.IChopeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChopeService {

    IChopeRepository chopeRepository;

    public ChopeService(IChopeRepository chopeRepository) {
        this.chopeRepository = chopeRepository;
    }


    public Chope getChopeByCodigoRFID(String codigo) {
        Optional<Chope> chopeOptional = chopeRepository.findChopeByCartaoRFID(codigo);
        if(chopeOptional.isPresent()){
            return chopeOptional.get();
        } else {
            throw new RuntimeException("Não existe um chope com esse código");
        }
    }

    public void adicionarEstoque(List<Chope> chopes) {
        for(Chope chopeSalvar : chopes){
            Optional<Chope> chopeOptional = chopeRepository.findById(chopeSalvar.getId());
            if(chopeOptional.isPresent()){
                Chope chope = chopeOptional.get();
                Double totalEstoque = chope.getQuantidadeEstoque() + chopeSalvar.getQuantidadeEstoque();
                chope.setQuantidadeEstoque(totalEstoque);
                chopeRepository.save(chope);
            }
        }
    }
}
