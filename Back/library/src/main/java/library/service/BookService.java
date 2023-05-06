package library.service;

import library.dto.BookRequest;
import library.dto.BookResponse;
import library.model.Book;
import library.repository.BookRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository repository;

    public Page<BookResponse> getAll(Pageable pageable) {
        return repository.findAll(pageable).map(BookResponse::of);
    }

    public BookResponse getById(Long id) {
        return BookResponse.of(repository.findById(id).get());
    }

    @Transactional
    public BookResponse create(BookRequest request) {
        var book = Book.of(request);
        return BookResponse.of(repository.save(book));
    }

    @Transactional
    public BookResponse update(BookRequest request, Long id) {
        var book = repository.findById(id).get();
        BeanUtils.copyProperties(request, book, "id");
        return BookResponse.of(repository.save(book));
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
