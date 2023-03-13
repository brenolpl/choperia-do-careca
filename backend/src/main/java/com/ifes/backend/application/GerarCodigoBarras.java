package com.ifes.backend.application;

import com.ifes.backend.domain.Produto;
import com.ifes.backend.persistence.IProdutoRepository;
import lombok.NoArgsConstructor;
import org.krysalis.barcode4j.impl.upcean.EAN13Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.util.Optional;
import java.util.Random;

import static java.lang.System.out;

@NoArgsConstructor
public class GerarCodigoBarras implements Serializable {

    private Produto produto;
    private IProdutoRepository repository;

    public GerarCodigoBarras(Produto produto, IProdutoRepository repository) {
        this.produto = produto;
        this.repository = repository;
    }

    public Produto execute() throws RuntimeException {
        if (produto.getCodigoBarras() == null || produto.getCodigoBarras().isEmpty()) {
            produto.setCodigoBarras(this.gerarCodigoBarras());
        }
        this.gerarImagemCodigoBarras();

        return produto;
    }

    private void gerarImagemCodigoBarras() {
        try {
            EAN13Bean barcodeGenerator = new EAN13Bean();
            File outputFile = new File("assets/" + produto.getNome() + ".png");
            OutputStream out = new FileOutputStream(outputFile);

            BitmapCanvasProvider canvas = new BitmapCanvasProvider(
                    out, "image/png", 120,
                    BufferedImage.TYPE_BYTE_BINARY, false, 0);

            //Generate the barcode
            barcodeGenerator.generateBarcode(canvas, produto.getCodigoBarras());

            //Signal end of generation
            canvas.finish();
        } catch (Exception  e) {
            throw new RuntimeException(e);
        } finally {
            out.close();
        }
    }

    private String gerarCodigoBarras() {
        Random rand = new Random();

        Integer numeroAleatorio = rand.nextInt(400);
        String numeroFim;

        while(numeroAleatorio < 999){
            numeroFim = formataNumeroFim(numeroAleatorio);
            String codigoBarras = "789202203" + numeroFim;

            String codigoBarrasCompleto = codigoBarras + gerarDigitoVerificador(codigoBarras + "0").toString();

            Optional<Produto> produtoOpt = this.repository.findProdutoByCodigoBarras(codigoBarrasCompleto);

            if(!produtoOpt.isPresent()){
                return codigoBarrasCompleto;
            }

            numeroAleatorio ++;
        }

        throw new RuntimeException("Sistema estourou o limite de codigos de barras");
    }

    private String formataNumeroFim(Integer numero){
        String numeroFim = numero.toString();
        return (numeroFim.length() == 2) ? "0" + numeroFim : (
                (numeroFim.length() == 1) ? "00" + numeroFim : numeroFim
        );
    }

    private Integer gerarDigitoVerificador(String codigoBarras) {
        int calculated;
        String ean;
        String checkSum = "131313131313";
        int sum = 0;

        ean = codigoBarras.substring(0, codigoBarras.length() - 1);
        for (int i = 0; i <= ean.length() - 1; i++) {
            sum += (Integer.parseInt("" + ean.charAt(i))) * (Integer.parseInt("" + checkSum.charAt(i)));
        }
        calculated = 10 - (sum % 10);
        return calculated;
    }
}
