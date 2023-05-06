package library.model;

import jakarta.persistence.*;
import library.dto.BookRequest;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "books")
@EqualsAndHashCode(of = "id")
public class Book {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "author")
    private String author;
    @Column(name = "page")
    private String page;

    public static Book of(BookRequest request) {
        var book = new Book();
        BeanUtils.copyProperties(request, book, "id");
        return book;
    }
}
