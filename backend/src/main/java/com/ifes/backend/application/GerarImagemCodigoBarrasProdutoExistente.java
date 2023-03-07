package com.ifes.backend.application;

import com.ifes.backend.domain.Produto;
import com.ifes.backend.persistence.IProdutoRepository;
import lombok.NoArgsConstructor;
import org.krysalis.barcode4j.impl.upcean.EAN13Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import static java.lang.System.out;

@NoArgsConstructor
public class GerarImagemCodigoBarrasProdutoExistente {

    private Integer id;
    private IProdutoRepository produtoRepository;

    public GerarImagemCodigoBarrasProdutoExistente(Integer id, IProdutoRepository produtoRepository) {
        this.id = id;
        this.produtoRepository = produtoRepository;
    }

    public void execute() {
        Produto p = produtoRepository.getReferenceById(id);
        try {
            EAN13Bean barcodeGenerator = new EAN13Bean();
            File outputFile = new File("assets/" + p.getNome() + ".png");
            OutputStream out = new FileOutputStream(outputFile);

            BitmapCanvasProvider canvas = new BitmapCanvasProvider(
                    out, "image/png", 120, BufferedImage.TYPE_BYTE_BINARY, false, 0);

            //Generate the barcode
            barcodeGenerator.generateBarcode(canvas, "789202203" + this.getCodigoBarras(p));

            //Signal end of generation
            canvas.finish();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        finally {
            out.close();
        }
    }

    private String getCodigoBarras(Produto p) {
        String code = p.getCodigoBarras().toString();
        if(code.length() == 1) {
            return "00" + code;
        } else if (code.length() == 2) {
            return "0" + code;
        } else if (code.length() == 3) {
            return code;
        } else {
            throw new RuntimeException("Código inválido");
        }
    }
}
