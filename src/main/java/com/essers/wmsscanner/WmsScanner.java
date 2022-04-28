package com.essers.wmsscanner;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.transaction.annotation.Transactional;

@SpringBootApplication
@Theme(value = "themaWMS")
@PWA(name = "WMS Scanner", shortName = "WMS", offlineResources = {"images/logo.png"})
@Transactional
public class WmsScanner extends SpringBootServletInitializer implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(WmsScanner.class, args);
    }

}
