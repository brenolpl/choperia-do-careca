package com.ifes.backend.services;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID_;
import com.ifes.backend.domain.Chope;
import com.ifes.backend.domain.Chope_;
import com.ifes.backend.domain.ItemConsumido;
import com.ifes.backend.domain.ItemConsumido_;
import com.ifes.backend.persistence.IChopeRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChopeService {

    IChopeRepository chopeRepository;

    private EntityManager entityManager;

    public ChopeService(IChopeRepository chopeRepository, EntityManager entityManager) {
        this.chopeRepository = chopeRepository;
        this.entityManager = entityManager;
    }


    public Chope getChopeByCodigoRFID(String codigo) {
        Optional<Chope> chopeOptional = chopeRepository.findChopeByCartaoRFID(codigo);
        if (chopeOptional.isPresent()) {
            return chopeOptional.get();
        } else {
            throw new RuntimeException("Não existe um chope com esse código");
        }
    }

    public void adicionarEstoque(List<Chope> chopes) {
        for (Chope chopeSalvar : chopes) {
            Optional<Chope> chopeOptional = chopeRepository.findById(chopeSalvar.getId());
            if (chopeOptional.isPresent()) {
                Chope chope = chopeOptional.get();
                Double totalEstoque = chope.getQuantidadeEstoque() + chopeSalvar.getQuantidadeEstoque();
                chope.setQuantidadeEstoque(totalEstoque);
                chopeRepository.save(chope);
            }
        }
    }

        public List<Chope> getChopesMaisConsumidos(LocalDateTime dataDe, LocalDateTime dataAte) {
            CriteriaBuilder cb = entityManager.getCriteriaBuilder();
            CriteriaQuery<Chope> query = cb.createQuery(Chope.class);

            Root<ItemConsumido> rootItemConsumido = query.from(ItemConsumido.class);
            Join<ItemConsumido, Chope> joinChope = rootItemConsumido.join(ItemConsumido_.chope);

            query.select(joinChope)
                    .where(cb.and(
                            cb.between(rootItemConsumido.get(ItemConsumido_.associacaoClienteCartaoRFID)
                                    .get(AssociacaoClienteCartaoRFID_.dataSaida), dataDe, dataAte),
                            cb.isNotNull(joinChope)
                    ))
                    .groupBy(joinChope.get(Chope_.id))
                    .orderBy(cb.desc(cb.count(joinChope.get(Chope_.id))));

            TypedQuery<Chope> typedQuery = entityManager.createQuery(query);

            List<Chope> chopes = typedQuery.getResultList();
            return chopes;
        }
//    public List<ItemConsumido> getChopesMaisConsumidos(LocalDateTime dataDe, LocalDateTime dataAte) {
//        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
//        CriteriaQuery<ItemConsumido> query = cb.createQuery(ItemConsumido.class);
//
//        Root<AssociacaoClienteCartaoRFID> rootAssociacao = query.from(AssociacaoClienteCartaoRFID.class);
//        Join<AssociacaoClienteCartaoRFID, ItemConsumido> joinItemConsumido = rootAssociacao.join(AssociacaoClienteCartaoRFID_.itensConsumidos);
//
//        query.multiselect(
//                        joinItemConsumido.get(ItemConsumido_.chope),
//                        joinItemConsumido.get(ItemConsumido_.id),
//                        joinItemConsumido.get(ItemConsumido_.nome),
//                        joinItemConsumido.get(ItemConsumido_.preco)
//            ).where(cb.and(
//                    cb.between(rootAssociacao.get(AssociacaoClienteCartaoRFID_.dataSaida), dataDe, dataAte),
//                    cb.isNotNull(joinItemConsumido.get(ItemConsumido_.chope))
//            ))
//            .groupBy(
//                    joinItemConsumido.get(ItemConsumido_.chope).get(Chope_.id),
//                    joinItemConsumido.get(ItemConsumido_.id),
//                    joinItemConsumido.get(ItemConsumido_.nome),
//                    joinItemConsumido.get(ItemConsumido_.preco)
//            ).orderBy(
//                    cb.desc(cb.count(joinItemConsumido.get(ItemConsumido_.id)))
//            );
//
//        TypedQuery<ItemConsumido> typedQuery = entityManager.createQuery(query);
//
//        List<ItemConsumido> chopes = typedQuery.getResultList();
//
//        return chopes;
//    }
}
