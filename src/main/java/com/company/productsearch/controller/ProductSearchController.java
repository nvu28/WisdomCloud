package com.company.productsearch.controller;

import com.company.productsearch.dto.SearchResponse;
import com.company.productsearch.service.ProductSearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Max;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Validated
@Tag(name = "Product Search", description = "API tim kiem san pham")
public class ProductSearchController {

    private final ProductSearchService productSearchService;

    @GetMapping("/search")
    @Operation(summary = "Tim kiem san pham",
            description = "Tim kiem san pham theo tu khoa, danh muc va khoang gia (co phan trang)")
    public ResponseEntity<SearchResponse> search(
            @Parameter(description = "Tu khoa tim kiem")
            @RequestParam(required = false) String q,

            @Parameter(description = "Slug danh muc")
            @RequestParam(required = false) String category,

            @Parameter(description = "Gia thap nhat VND")
            @RequestParam(required = false) BigDecimal minPrice,

            @Parameter(description = "Gia cao nhat VND")
            @RequestParam(required = false) BigDecimal maxPrice,

            @Parameter(description = "So trang (0-based)")
            @RequestParam(defaultValue = "0") int page,

            @Parameter(description = "So luong/trang")
            @RequestParam(defaultValue = "20") @Max(100) int size,

            @Parameter(description = "Sap xep (VD: price:desc, name:asc)")
            @RequestParam(defaultValue = "name:asc") String sort) {

        SearchResponse response = productSearchService.search(q, category, minPrice, maxPrice, page, size, sort);
        return ResponseEntity.ok(response);
    }
}
