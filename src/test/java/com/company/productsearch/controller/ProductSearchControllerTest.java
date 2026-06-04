package com.company.productsearch.controller;

import com.company.productsearch.dto.ProductResponse;
import com.company.productsearch.dto.SearchResponse;
import com.company.productsearch.service.ProductSearchService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.bean.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductSearchController.class)
class ProductSearchControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductSearchService productSearchService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void search_withAllParams_shouldReturn200() throws Exception {
        SearchResponse response = SearchResponse.builder()
                .content(List.of(
                        ProductResponse.builder()
                                .id(1L)
                                .name("iPhone 16")
                                .slug("iphone-16")
                                .price(new BigDecimal("22990000"))
                                .categoryName("Dien thoai")
                                .categorySlug("dien-thoai")
                                .status("ACTIVE")
                                .build()
                ))
                .page(0)
                .size(5)
                .totalElements(1)
                .totalPages(1)
                .last(true)
                .build();

        when(productSearchService.search(any(), any(), any(), any(), anyInt(), anyInt(), any()))
                .thenReturn(response);

        mockMvc.perform(get("/api/v1/products/search")
                        .param("q", "iphone")
                        .param("category", "dien-thoai")
                        .param("minPrice", "5000000")
                        .param("maxPrice", "50000000")
                        .param("page", "0")
                        .param("size", "5")
                        .param("sort", "price:desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("iPhone 16"))
                .andExpect(jsonPath("$.content[0].categoryName").value("Dien thoai"))
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.last").value(true));
    }

    @Test
    void search_withNoParams_shouldReturn200() throws Exception {
        SearchResponse response = SearchResponse.builder()
                .content(List.of())
                .page(0)
                .size(20)
                .totalElements(0)
                .totalPages(0)
                .last(true)
                .build();

        when(productSearchService.search(any(), any(), any(), any(), anyInt(), anyInt(), any()))
                .thenReturn(response);

        mockMvc.perform(get("/api/v1/products/search"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.page").value(0));
    }

    @Test
    void search_withSizeOver100_shouldReturn400() throws Exception {
        mockMvc.perform(get("/api/v1/products/search")
                        .param("size", "200"))
                .andExpect(status().isBadRequest());
    }
}
