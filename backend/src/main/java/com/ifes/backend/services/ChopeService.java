package com.ifes.backend.services;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID_;
import com.ifes.backend.domain.Chope;
import com.ifes.backend.domain.Chope_;
import com.ifes.backend.domain.ItemConsumido;
import com.ifes.backend.domain.ItemConsumido_;
import com.ifes.backend.domain.LogCompraChope;
import com.ifes.backend.persistence.IChopeRepository;
import com.ifes.backend.persistence.ILogCompraChopeRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChopeService {

    IChopeRepository chopeRepository;
    ILogCompraChopeRepository logCompraChopeRepository;

    private EntityManager entityManager;

    public ChopeService(IChopeRepository chopeRepository, EntityManager entityManager, ILogCompraChopeRepository logCompraChopeRepository) {
        this.chopeRepository = chopeRepository;
        this.entityManager = entityManager;
        this.logCompraChopeRepository = logCompraChopeRepository;
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
                chope = chopeRepository.save(chope);
                // salvar log
                LogCompraChope logCompraChope = new LogCompraChope();
                logCompraChope.setChope(chope);
                logCompraChope.setQuantidade(chopeSalvar.getQuantidadeEstoque());
                logCompraChope.setDataEntrada(LocalDateTime.now());
                logCompraChope.setPrecoCompra(chope.getPrecoCompra());
                logCompraChope.setPrecoTotal(chope.getPrecoCompra().multiply(new BigDecimal(chopeSalvar.getQuantidadeEstoque() / 100)));
                logCompraChopeRepository.save(logCompraChope);
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

    public List<LogCompraChope> getChopesCompradosPeriodo(LocalDateTime dataDe, LocalDateTime dataAte) {
        return logCompraChopeRepository.findLogCompraChopeByDataEntradaBetween(dataDe, dataAte);
    }
}
