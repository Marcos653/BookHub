package library.dto;

import library.model.Book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookResponse {

    private Long id;
    private String title;
    private String author;
    private String page;

    public static BookResponse of(Book book) {
        var response = new BookResponse();
        BeanUtils.copyProperties(book, response);
        return response;
    }
}
