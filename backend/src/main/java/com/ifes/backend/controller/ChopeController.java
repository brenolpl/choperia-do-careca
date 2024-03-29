package com.ifes.backend.controller;

import com.ifes.backend.domain.Chope;
import com.ifes.backend.domain.LogCompraChope;
import com.ifes.backend.persistence.IChopeRepository;
import com.ifes.backend.services.ChopeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/chopes")
public class ChopeController extends BaseController<Chope, IChopeRepository, Integer> {

    private ChopeService chopeService;

    public ChopeController(IChopeRepository repository, ChopeService chopeService) {
        super(Chope.class, repository);
        this.chopeService = chopeService;
    }

    @GetMapping("codigo-rfid/{codigo}")
    public Chope getProdutoByCodigoBarras(@PathVariable String codigo) {
        return this.chopeService.getChopeByCodigoRFID(codigo);
    }

    @PostMapping("adicionar-estoque")
    public void adicionarEstoque(@RequestBody List<Chope> chopes) {
        this.chopeService.adicionarEstoque(chopes);
    }

    @GetMapping("mais-consumidos")
    public List<Chope> chopesMaisConsumidos(@RequestParam("dataDe") LocalDateTime dataDe, @RequestParam LocalDateTime dataAte) {
        return this.chopeService.getChopesMaisConsumidos(dataDe, dataAte);
    }

    @GetMapping("periodo")
    public List<LogCompraChope> getProdutosPeriodo(@RequestParam("dataDe") LocalDateTime dataDe, @RequestParam LocalDateTime dataAte) {
        return this.chopeService.getChopesCompradosPeriodo(dataDe, dataAte);
    }
}
