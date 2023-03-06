package com.ifes.backend.controller;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public abstract class BaseController<SOURCE, REPOSITORY extends JpaRepository<SOURCE, Integer>> {

    protected Class<SOURCE> entityClass;
    protected REPOSITORY repository;

    public BaseController(Class<SOURCE> entityClass, REPOSITORY repository) {
        this.entityClass = entityClass;
        this.repository = repository;
    }

    @GetMapping()
    public List<SOURCE> get(){
        return repository.findAll();
    }

    @GetMapping("{id}")
    public SOURCE get(@PathVariable Integer id) {
        return repository.findById(id).get();
    }

    @PostMapping()
    public SOURCE create(@RequestBody SOURCE source) {
        return repository.save(source);
    }

    @PatchMapping("{id}")
    public SOURCE update(@RequestBody SOURCE source) {
        return repository.save(source);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
