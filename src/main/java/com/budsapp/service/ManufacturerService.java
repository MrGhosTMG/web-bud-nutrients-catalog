package com.budsapp.service;

import com.budsapp.entity.Manufacturer;
import com.budsapp.exception.BadRequestException;
import com.budsapp.repository.ManufacturerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ManufacturerService {

    private final ManufacturerRepository manufacturerRepository;

    public List<Manufacturer> getAll() {
        return manufacturerRepository.findAll();
    }

    public Manufacturer add(String name) {
        if (manufacturerRepository.existsByName(name)) {
            throw new BadRequestException("Manufacturer already exists");
        }
        return manufacturerRepository.save(Manufacturer.builder().name(name).build());
    }

    public void delete(Long id) {
        manufacturerRepository.deleteById(id);
    }
}
