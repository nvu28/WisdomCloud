package com.company.productsearch.service;

import com.company.productsearch.dto.ProductResponse;
import com.company.productsearch.dto.SearchResponse;
import com.company.productsearch.entity.Product;
import com.company.productsearch.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductSearchService {

    private final ProductRepository productRepository;

    public SearchResponse search(String keyword, String category, BigDecimal minPrice,
                                  BigDecimal maxPrice, int page, int size, String sort) {
        int validatedSize = Math.min(size, 100);
        Pageable pageable = buildPageable(page, validatedSize, sort);
        Page<Product> productPage = productRepository.searchProducts(
                keyword, category, minPrice, maxPrice, pageable);
        return toSearchResponse(productPage);
    }

    private Pageable buildPageable(int page, int size, String sort) {
        if (sort == null || sort.isBlank()) {
            return PageRequest.of(page, size, Sort.by("name").ascending());
        }
        String[] parts = sort.split(":");
        String field = parts[0].trim();
        Sort.Direction direction = parts.length > 1 && "desc".equalsIgnoreCase(parts[1].trim())
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        return PageRequest.of(page, size, Sort.by(direction, field));
    }

    private SearchResponse toSearchResponse(Page<Product> page) {
        return SearchResponse.builder()
                .content(page.getContent().stream().map(this::toProductResponse).toList())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }

    private ProductResponse toProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .description(product.getDescription())
                .price(product.getPrice())
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .categorySlug(product.getCategory() != null ? product.getCategory().getSlug() : null)
                .imageUrl(product.getImageUrl())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .build();
    }
}
