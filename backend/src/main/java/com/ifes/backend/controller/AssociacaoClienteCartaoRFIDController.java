package com.ifes.backend.controller;

import com.ifes.backend.domain.AssociacaoClienteCartaoRFID;
import com.ifes.backend.domain.CartaoRFID;
import com.ifes.backend.domain.Chope;
import com.ifes.backend.domain.ItemConsumido;
import com.ifes.backend.dto.AssociacaoSelfServiceDto;
import com.ifes.backend.dto.ChopeDto;
import com.ifes.backend.dto.ConsumirChopeDto;
import com.ifes.backend.persistence.IAssociacaoClienteCartaoRFIDRepository;
import com.ifes.backend.persistence.IChopeRepository;
import com.ifes.backend.persistence.IItemConsumidoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/associacao-cliente-cartao-rfid")
public class AssociacaoClienteCartaoRFIDController extends BaseController<AssociacaoClienteCartaoRFID, IAssociacaoClienteCartaoRFIDRepository, Integer> {

    private final IChopeRepository chopeRepository;
    private final IItemConsumidoRepository itemConsumidoRepository;

    public AssociacaoClienteCartaoRFIDController(IAssociacaoClienteCartaoRFIDRepository repository, IChopeRepository chopeRepository, IItemConsumidoRepository itemConsumidoRepository) {
        super(AssociacaoClienteCartaoRFID.class, repository);
        this.chopeRepository = chopeRepository;
        this.itemConsumidoRepository = itemConsumidoRepository;
    }

    @GetMapping("associacoesCorrentes")
    public List<AssociacaoClienteCartaoRFID> associacoesCorrentes() {
        return repository.findAssociacaoClienteCartaoRFIDSByDataSaidaEquals(null);
    }

    @Override
    public AssociacaoClienteCartaoRFID create(@RequestBody AssociacaoClienteCartaoRFID associacaoClienteCartaoRFID) {
        associacaoClienteCartaoRFID.setDataEntrada(LocalDateTime.now());
        return super.create(associacaoClienteCartaoRFID);
    }

    @GetMapping("getByCartaoRfid/{cartaoId}")
    public AssociacaoClienteCartaoRFID getByCartaoRfid(@PathVariable String cartaoId) {
        Optional<AssociacaoClienteCartaoRFID> associacao =  repository.findFirstByCartaoRFIDAndDataSaidaEquals(new CartaoRFID(cartaoId), null);
        if(associacao.isPresent()) return associacao.get();
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
}
