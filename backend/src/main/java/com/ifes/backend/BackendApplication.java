package com.ifes.backend;


import com.aspose.barcode.EncodeTypes;
import com.aspose.barcode.generation.BarcodeGenerator;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
	CommandLineRunner run(){
		return args -> {
            BarcodeGenerator generator = new BarcodeGenerator(EncodeTypes.EAN_13, "test code");
// set resolution
            generator.getParameters().setResolution(203);
// generate barcode
            generator.save("generate-barcode.png");
		};
	}
}
