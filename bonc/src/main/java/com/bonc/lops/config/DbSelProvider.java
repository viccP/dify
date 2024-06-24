package com.bonc.lops.config;

import org.springframework.data.neo4j.core.DatabaseSelection;
import org.springframework.data.neo4j.core.DatabaseSelectionProvider;
import org.springframework.stereotype.Component;

@Component
public class DbSelProvider implements DatabaseSelectionProvider {

    private static final ThreadLocal<String> databaseName = new ThreadLocal<>();

    @Override
    public DatabaseSelection getDatabaseSelection() {
        return DatabaseSelection.byName(databaseName.get());
    }

    public void setDatabase(String database) {
        databaseName.set(database);
    }

    public void clearDatabase() {
        databaseName.remove();
    }
}
