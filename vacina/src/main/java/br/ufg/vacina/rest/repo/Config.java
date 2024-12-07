package br.ufg.vacina.rest.repo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.stream.Collectors;

@Configuration
public class Config implements RepositoryRestConfigurer {


    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry corsRegistry) {
        config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(Type::getJavaType).toList().toArray(new Class[0]));
    }

}

