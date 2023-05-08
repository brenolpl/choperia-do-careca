package com.ifes.backend.persistence;

import com.ifes.backend.dto.ReceitaDespesaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class ReceitasDespesasRepository {

    @Autowired
    private EntityManager entityManager;

    public List<Object[]> getReceitasDespesas(LocalDateTime dataDe, LocalDateTime dataAte){
        return entityManager.createNativeQuery("SELECT " +
                        "    COALESCE(d.data_entrada, e.data_entrada, i.data_entrada) AS data, " +
                        "    COALESCE(SUM(i.preco), 0) AS receita, " +
                        "    COALESCE(SUM(d.total_compra), 0) + COALESCE(sum(e.total_compra), 0) AS despesa " +
                        "FROM " +
                        "    (SELECT " +
                        "         CAST(l.data_entrada AS DATE) AS data_entrada, " +
                        "         SUM(l.preco_total) AS total_compra " +
                        "     FROM " +
                        "         log_compra_chope l " +
                        "     where cast(l.data_entrada as Date) between :dataDe and :dataAte " +
                        "     GROUP BY " +
                        "         CAST(l.data_entrada AS DATE)) d " +
                        "        FULL OUTER JOIN " +
                        "    (SELECT " +
                        "         CAST(e.data_entrada AS DATE) AS data_entrada, " +
                        "         SUM(e.preco_compra) AS total_compra " +
                        "     FROM " +
                        "         estoque_produto e " +
                        "     where cast(e.data_entrada as Date) between :dataDe and :dataAte " +
                        "     GROUP BY " +
                        "         CAST(e.data_entrada AS DATE)) e " +
                        "    ON d.data_entrada = e.data_entrada " +
                        "        left join " +
                        "    (SELECT " +
                        "         CAST(accr.data_entrada AS DATE) AS data_entrada, " +
                        "         SUM(i.preco) AS preco " +
                        "     FROM " +
                        "         itens_consumidos i " +
                        "             JOIN associacao_cliente_cartao_rfid accr ON i.associacao_cliente_cartao_rfid_id = accr.id " +
                        "     GROUP BY " +
                        "         CAST(accr.data_entrada AS DATE)) i " +
                        "    ON e.data_entrada = i.data_entrada OR d.data_entrada = i.data_entrada " +
                        "        and cast(i.data_entrada as Date) between :dataDe and :dataAte " +
                        "GROUP BY data " +
                        "ORDER BY data")
                .setParameter("dataDe", dataDe)
                .setParameter("dataAte", dataAte)
                .getResultList();
    }
}
