// Variáveis globais
const apiUrl = 'http://localhost:8080/api/books';
let currentPage = 0;
const pageSize = 5;

// Carrega os livros da API
function loadBooks() {
    fetch(`${apiUrl}?page=${currentPage}&size=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.content);
            createPagination(data.totalPages);
        });
}

// Exibe os livros na tabela
function displayBooks(books) {
    const bookTableBody = document.getElementById('bookTableBody');
    bookTableBody.innerHTML = '';

    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${book.id}</th>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.page}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="editBook(${book.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Delete</button>
            </td>
        `;
        bookTableBody.appendChild(row);
    });
}

// Cria a paginação
function createPagination(totalPages) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (i === currentPage) {
            pageItem.classList.add('active');
        }

        pageItem.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i})">${i + 1}</a>`;
        pagination.appendChild(pageItem);
    }
}

// Vai para a página especificada
function goToPage(page) {
    currentPage = page;
    loadBooks();
}

// Adiciona ou atualiza um livro
function submitBookForm(event) {
    event.preventDefault();

    const bookId = document.getElementById('bookId').value;
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const page = document.getElementById('page').value;

    const bookData = {
        title: title,
        author: author,
        page: page
    };

    if (bookId) {
        // Atualiza o livro existente
        fetch(`${apiUrl}/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        }).then(() => {
            resetBookForm();
            loadBooks();
        });
    } else {
        // Cria um novo livro
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        }).then(() => {
            resetBookForm();
            loadBooks();
        });
    }
}

// Preenche o formulário para editar um livro
function editBook(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(book => {
            document.getElementById('bookId').value = book.id;
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('author').value = book.author;
            document.getElementById('page').value = book.page;

            // Atualiza o texto do botão de envio
            document.getElementById('submitBtn').innerText = 'Update';
        });
}

// Exclui um livro
function deleteBook(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    }).then(() => {
        loadBooks();
    });
}

// Reseta o formulário
function resetBookForm() {
    document.getElementById('bookId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('page').value = '';

    // Atualiza o texto do botão de envio
    document.getElementById('submitBtn').innerText = 'Create';
}

// Adiciona o evento de envio do formulário
document.querySelector('.book-form').addEventListener('submit', submitBookForm);

// Carrega os livros ao abrir a página
loadBooks();

