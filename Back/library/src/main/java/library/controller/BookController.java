package library.controller;

import library.dto.BookRequest;
import library.dto.BookResponse;
import library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/books")
public class BookController {

    @Autowired
    private BookService service;

    @GetMapping
    public Page<BookResponse> getAll(@PageableDefault(size = 5) Pageable pageable) {
        return service.getAll(pageable);
    }

    @GetMapping("{id}")
    public BookResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public BookResponse create(@RequestBody BookRequest request) {
        return service.create(request);
    }

    @PutMapping("{id}")
    public BookResponse update(@RequestBody BookRequest request, @PathVariable Long id) {
        return service.update(request, id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
