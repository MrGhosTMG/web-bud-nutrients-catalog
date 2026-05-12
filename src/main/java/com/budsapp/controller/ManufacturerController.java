package com.budsapp.controller;

import com.budsapp.dto.ApiResponse;
import com.budsapp.entity.Manufacturer;
import com.budsapp.service.ManufacturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manufacturers")
@RequiredArgsConstructor
public class ManufacturerController {

    private final ManufacturerService manufacturerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Manufacturer>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(manufacturerService.getAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Manufacturer>> add(@RequestParam String name) {
        return ResponseEntity.ok(ApiResponse.ok("Manufacturer added", manufacturerService.add(name)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        manufacturerService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Manufacturer deleted", null));
    }
}
