package com.budsapp.service;

import com.budsapp.entity.Category;
import com.budsapp.exception.BadRequestException;
import com.budsapp.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Category add(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new BadRequestException("Category already exists");
        }
        return categoryRepository.save(Category.builder().name(name).build());
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
