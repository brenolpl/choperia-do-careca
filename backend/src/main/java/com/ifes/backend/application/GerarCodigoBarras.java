package com.ifes.backend.application;

import com.ifes.backend.domain.Produto;
import com.ifes.backend.domain.Produto_;
import com.ifes.backend.persistence.IProdutoRepository;
import lombok.NoArgsConstructor;
import org.krysalis.barcode4j.impl.upcean.EAN13Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.System.out;

@NoArgsConstructor
public class GerarCodigoBarras implements Serializable {

    private List<Produto> produtos;
    private IProdutoRepository repository;

    private EntityManager entityManager;

    public GerarCodigoBarras(List<Produto> produtos, IProdutoRepository repository, EntityManager entityManager) {
        this.produtos = produtos;
        this.repository = repository;
        this.entityManager = entityManager;
    }

    public void execute() throws RuntimeException{
        this.produtos = repository.findProdutosByIdIn(produtos.stream().map(p -> p.getId()).collect(Collectors.toList()));
        for (Produto p : produtos) {
            if(p.getCodigoBarras() == null) {
                try {
                    EAN13Bean barcodeGenerator = new EAN13Bean();
                    File outputFile = new File("assets/" + p.getNome() + ".png");
                    OutputStream out = new FileOutputStream(outputFile);

                    BitmapCanvasProvider canvas = new BitmapCanvasProvider(
                            out, "image/png", 120, BufferedImage.TYPE_BYTE_BINARY, false, 0);

                    //Generate the barcode
                    barcodeGenerator.generateBarcode(canvas, gerarCodigoBarras(p));

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
            } else {
                throw new RuntimeException("Não é permitido gerar um código de barras para um produto que já possui código de barras");
            }
        }

    }

    private String gerarCodigoBarras(Produto p){
        return "789202203" + this.calcularUltimoCodigo(p);
    }

    private String calcularUltimoCodigo(Produto p) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery query = builder.createQuery(Produto.class);
        Root<Produto> root = query.from(Produto.class);

        query.select(builder.greatest(root.get(Produto_.codigoBarras)));

        Integer result = (Integer) entityManager.createQuery(query).getSingleResult();

        Integer lastCode = result + 1;

        p.setCodigoBarras(lastCode);
        repository.save(p);
        repository.flush();

        String stringCode = lastCode.toString();

        if(stringCode.length() == 3) {
            return stringCode;
        } else if (stringCode.length() == 2) {
            return "0" + stringCode;
        } else if (stringCode.length() == 1) {
            return "00" + stringCode;
        } else {
            throw new RuntimeException("Não é possível gerar o código de barras de um produto com número superior a 999 e inferior a 0");
        }
    }
}
