package com.company.productsearch.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private BigDecimal price;
    private String categoryName;
    private String categorySlug;
    private String imageUrl;
    private String status;
    private LocalDateTime createdAt;
}
