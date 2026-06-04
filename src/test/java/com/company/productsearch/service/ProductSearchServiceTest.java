package com.company.productsearch.service;

import com.company.productsearch.dto.ProductResponse;
import com.company.productsearch.dto.SearchResponse;
import com.company.productsearch.entity.Category;
import com.company.productsearch.entity.Product;
import com.company.productsearch.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductSearchServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductSearchService productSearchService;

    private Product createMockProduct(Long id, String name, BigDecimal price, String categoryName, String categorySlug) {
        Category category = new Category();
        category.setId(1L);
        category.setName(categoryName);
        category.setSlug(categorySlug);

        Product product = new Product();
        product.setId(id);
        product.setName(name);
        product.setSlug(name.toLowerCase().replace(" ", "-"));
        product.setDescription("Description for " + name);
        product.setPrice(price);
        product.setCategory(category);
        product.setImageUrl("/images/" + name.toLowerCase().replace(" ", "-") + ".jpg");
        product.setStatus("ACTIVE");
        return product;
    }

    @Test
    void search_withKeyword_shouldReturnMatchingProducts() {
        List<Product> products = List.of(
                createMockProduct(1L, "iPhone 16", new BigDecimal("22990000"), "Dien thoai", "dien-thoai"),
                createMockProduct(2L, "iPhone 16 Pro", new BigDecimal("28990000"), "Dien thoai", "dien-thoai")
        );
        Page<Product> page = new PageImpl<>(products, PageRequest.of(0, 20), 2);

        when(productRepository.searchProducts(eq("iphone"), isNull(), isNull(), isNull(), any(Pageable.class)))
                .thenReturn(page);

        SearchResponse response = productSearchService.search("iphone", null, null, null, 0, 20, "name:asc");

        assertNotNull(response);
        assertEquals(2, response.getContent().size());
        assertEquals(2, response.getTotalElements());
        assertEquals(0, response.getPage());
        assertEquals(20, response.getSize());
        assertFalse(response.isLast());

        ProductResponse first = response.getContent().get(0);
        assertEquals("iPhone 16", first.getName());
        assertEquals("Dien thoai", first.getCategoryName());
        assertEquals("dien-thoai", first.getCategorySlug());
    }

    @Test
    void search_withCategory_shouldFilterByCategory() {
        List<Product> products = List.of(
                createMockProduct(3L, "MacBook Pro 16", new BigDecimal("59990000"), "Laptop", "laptop"),
                createMockProduct(4L, "MacBook Air M4", new BigDecimal("28990000"), "Laptop", "laptop")
        );
        Page<Product> page = new PageImpl<>(products, PageRequest.of(0, 20), 2);

        when(productRepository.searchProducts(isNull(), eq("laptop"), isNull(), isNull(), any(Pageable.class)))
                .thenReturn(page);

        SearchResponse response = productSearchService.search(null, "laptop", null, null, 0, 20, "name:asc");

        assertNotNull(response);
        assertEquals(2, response.getContent().size());
        response.getContent().forEach(p -> assertEquals("Laptop", p.getCategoryName()));
    }

    @Test
    void search_withPriceRange_shouldFilterByPrice() {
        List<Product> products = List.of(
                createMockProduct(5L, "iPhone 16", new BigDecimal("22990000"), "Dien thoai", "dien-thoai"),
                createMockProduct(6L, "iPhone 16 Pro", new BigDecimal("28990000"), "Dien thoai", "dien-thoai")
        );
        Page<Product> page = new PageImpl<>(products, PageRequest.of(0, 20), 2);

        when(productRepository.searchProducts(isNull(), isNull(), eq(new BigDecimal("20000000")), eq(new BigDecimal("30000000")), any(Pageable.class)))
                .thenReturn(page);

        SearchResponse response = productSearchService.search(null, null, new BigDecimal("20000000"), new BigDecimal("30000000"), 0, 20, "name:asc");

        assertNotNull(response);
        assertEquals(2, response.getContent().size());
    }

    @Test
    void search_withSort_shouldApplySorting() {
        List<Product> products = List.of(
                createMockProduct(7L, "iPhone 16 Pro Max", new BigDecimal("34990000"), "Dien thoai", "dien-thoai"),
                createMockProduct(8L, "iPhone 16", new BigDecimal("22990000"), "Dien thoai", "dien-thoai")
        );
        Page<Product> page = new PageImpl<>(products, PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "price")), 2);

        when(productRepository.searchProducts(isNull(), isNull(), isNull(), isNull(), any(Pageable.class)))
                .thenReturn(page);

        SearchResponse response = productSearchService.search(null, null, null, null, 0, 20, "price:desc");

        assertNotNull(response);
        verify(productRepository).searchProducts(isNull(), isNull(), isNull(), isNull(),
                argThat(p -> p.getSort().stream().anyMatch(o -> o.getProperty().equals("price") && o.isDescending())));
    }

    @Test
    void search_withSizeExceedingMax_shouldCapAt100() {
        Page<Product> emptyPage = new PageImpl<>(List.of(), PageRequest.of(0, 100), 0);

        when(productRepository.searchProducts(isNull(), isNull(), isNull(), isNull(), any(Pageable.class)))
                .thenReturn(emptyPage);

        SearchResponse response = productSearchService.search(null, null, null, null, 0, 200, "name:asc");

        assertNotNull(response);
        verify(productRepository).searchProducts(isNull(), isNull(), isNull(), isNull(),
                argThat(p -> p.getPageSize() == 100));
    }

    @Test
    void search_withNoResults_shouldReturnEmptyPage() {
        Page<Product> emptyPage = new PageImpl<>(List.of(), PageRequest.of(0, 20), 0);

        when(productRepository.searchProducts(eq("xyz-not-exist"), isNull(), isNull(), isNull(), any(Pageable.class)))
                .thenReturn(emptyPage);

        SearchResponse response = productSearchService.search("xyz-not-exist", null, null, null, 0, 20, "name:asc");

        assertNotNull(response);
        assertTrue(response.getContent().isEmpty());
        assertEquals(0, response.getTotalElements());
        assertTrue(response.isLast());
    }
}
