package com.ifes.backend.controller;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID;
import com.ifes.backend.domain.AssociacaoClienteCartaoRFID_;
import com.ifes.backend.domain.CartaoRFID;
import com.ifes.backend.domain.Chope;
import com.ifes.backend.domain.EstoqueProduto;
import com.ifes.backend.domain.EstoqueProduto_;
import com.ifes.backend.domain.ItemConsumido;
import com.ifes.backend.domain.ItemConsumido_;
import com.ifes.backend.domain.LogCompraChope;
import com.ifes.backend.domain.LogCompraChope_;
import com.ifes.backend.dto.AssociacaoSelfServiceDto;
import com.ifes.backend.dto.ChopeDto;
import com.ifes.backend.dto.ConsumirChopeDto;
import com.ifes.backend.dto.ReceitaDespesaDto;
import com.ifes.backend.persistence.IAssociacaoClienteCartaoRFIDRepository;
import com.ifes.backend.persistence.IChopeRepository;
import com.ifes.backend.persistence.IItemConsumidoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("api/associacao-cliente-cartao-rfid")
public class AssociacaoClienteCartaoRFIDController extends BaseController<AssociacaoClienteCartaoRFID, IAssociacaoClienteCartaoRFIDRepository, Integer> {

    private final IChopeRepository chopeRepository;
    private final IItemConsumidoRepository itemConsumidoRepository;

    private final EntityManager entityManager;

    public AssociacaoClienteCartaoRFIDController(IAssociacaoClienteCartaoRFIDRepository repository, IChopeRepository chopeRepository, IItemConsumidoRepository itemConsumidoRepository, EntityManager entityManager) {
        super(AssociacaoClienteCartaoRFID.class, repository);
        this.chopeRepository = chopeRepository;
        this.itemConsumidoRepository = itemConsumidoRepository;
        this.entityManager = entityManager;
    }

    @GetMapping("associacoesCorrentes")
    public List<AssociacaoClienteCartaoRFID> associacoesCorrentes() {
        return repository.findAssociacaoClienteCartaoRFIDSByDataSaidaEquals(null);
    }

    @GetMapping("contasPagas")
    public List<AssociacaoClienteCartaoRFID> contasPagas() {
        return repository.findAssociacaoClienteCartaoRFIDSByDataSaidaNotNull();
    }

    @Override
    public AssociacaoClienteCartaoRFID create(@RequestBody AssociacaoClienteCartaoRFID associacaoClienteCartaoRFID) {
        associacaoClienteCartaoRFID.setDataEntrada(LocalDateTime.now());
        return super.create(associacaoClienteCartaoRFID);
    }

    @GetMapping("getByCartaoRfid/{cartaoId}")
    public AssociacaoClienteCartaoRFID getByCartaoRfid(@PathVariable String cartaoId) {
        Optional<AssociacaoClienteCartaoRFID> associacao = repository.findFirstByCartaoRFIDAndDataSaidaEquals(new CartaoRFID(cartaoId), null);
        if (associacao.isPresent()) return associacao.get();
        else throw new RuntimeException("Cartão não encontrado!");
    }

    @GetMapping("getByAssociacao/{associacaoId}")
    public AssociacaoClienteCartaoRFID getByAssociacao(@PathVariable Integer associacaoId) {
        Optional<AssociacaoClienteCartaoRFID> associacao = repository.findById(associacaoId);
        if (associacao.isPresent()) return associacao.get();
        else throw new RuntimeException("Cartão não encontrado!");
    }

    @PostMapping("consumir-chopes")
    public void consumirChopes(@RequestBody ConsumirChopeDto consumirChopeDto) {
        Optional<AssociacaoClienteCartaoRFID> associacao = repository.findFirstByCartaoRFIDAndDataSaidaEquals(new CartaoRFID(consumirChopeDto.getCodigoRFID()), null);
        for (ChopeDto chopeDto : consumirChopeDto.getChopes()) {
            Chope chope = chopeRepository.findById(chopeDto.getId()).get();
            for (int i = 0; i < chopeDto.getQuantidade(); i++) {
                ItemConsumido item = new ItemConsumido();
                item.setChope(chope);
                item.setPreco(chope.getPrecoVenda());
                item.setAssociacaoClienteCartaoRFID(associacao.get());
                itemConsumidoRepository.save(item);
            }
            Double quantidadeRetirada = chopeDto.getQuantidade() * 0.5;
            chope.setQuantidadeEstoque(chope.getQuantidadeEstoque() - quantidadeRetirada);
            chopeRepository.save(chope);
        }


    }

    @PostMapping("fechar-pedido")
    public void fecharPedido(@RequestBody Set<AssociacaoClienteCartaoRFID> associacoes) {
        for (AssociacaoClienteCartaoRFID a : associacoes) {
            AssociacaoClienteCartaoRFID associacaoBanco = repository.findById(a.getId()).get();
            associacaoBanco.setDataSaida(LocalDateTime.now());
            repository.saveAndFlush(associacaoBanco);
        }
    }

    @PostMapping("addSelfService")
    public void addSelfService(@RequestBody AssociacaoSelfServiceDto associacaoSelfServiceDto) {
        Optional<AssociacaoClienteCartaoRFID> associacao = repository.findById(associacaoSelfServiceDto.getIdAssociacao());
        ItemConsumido itemConsumido = new ItemConsumido();
        itemConsumido.setAssociacaoClienteCartaoRFID(associacao.get());
        itemConsumido.setChope(null);
        itemConsumido.setNome("Self-Service");
        itemConsumido.setPreco(associacaoSelfServiceDto.getTotalPagar());
        itemConsumidoRepository.save(itemConsumido);
    }

    @GetMapping("receitas-despesas-periodo")
    public List<ReceitaDespesaDto> getReceitasDespesasPeriodo(@RequestParam("dataDe") LocalDateTime dataDe, @RequestParam LocalDateTime dataAte) {
//        return this.repository.getReceitasDespesas(dataDe, dataAte);
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<ReceitaDespesaDto> query = cb.createQuery(ReceitaDespesaDto.class);

        Root<LogCompraChope> logCompraChope = query.from(LogCompraChope.class);
        Root<EstoqueProduto> estoqueProduto = query.from(EstoqueProduto.class);
        Root<AssociacaoClienteCartaoRFID> associacaoClienteCartaoRFID = query.from(AssociacaoClienteCartaoRFID.class);
        Root<ItemConsumido> itemConsumido = query.from(ItemConsumido.class);

        Expression<BigDecimal> totalSaida = cb.sum(
                cb.<BigDecimal>selectCase()
                        .when(
                                cb.isNotNull(logCompraChope.get(LogCompraChope_.chope)),
                                logCompraChope.get(LogCompraChope_.precoTotal)
                        )
                        .when(
                                cb.isNotNull(estoqueProduto.get(EstoqueProduto_.produto)),
                                estoqueProduto.get(EstoqueProduto_.precoCompra)
                        ).otherwise(BigDecimal.ZERO)
        );

        Expression<BigDecimal> totalEntrada = cb.sum(
                cb.<BigDecimal>selectCase()
                        .when(
                                cb.isNotNull(associacaoClienteCartaoRFID.get(AssociacaoClienteCartaoRFID_.itensConsumidos)),
                                itemConsumido.get(ItemConsumido_.preco)
                        )
                        .otherwise(BigDecimal.ZERO)
        );

        Expression<String> dia = cb.function("to_char", String.class, logCompraChope.get(LogCompraChope_.dataEntrada), cb.literal("DD/MM/YYYY"));



        query.multiselect(dia.alias("data"), totalEntrada.alias("totalEntrada"), totalSaida.alias("totalSaida"))
                .where(
                        cb.and(
                                cb.between(logCompraChope.get(LogCompraChope_.dataEntrada), dataDe, dataAte),
                                cb.between(estoqueProduto.get(EstoqueProduto_.dataEntrada), dataDe, dataAte),
                                cb.between(associacaoClienteCartaoRFID.get(AssociacaoClienteCartaoRFID_.dataSaida), dataDe, dataAte)
                        )
                )
                .groupBy(dia)
                .orderBy(cb.asc(dia));

        return entityManager.createQuery(query).getResultList();
    }
}
