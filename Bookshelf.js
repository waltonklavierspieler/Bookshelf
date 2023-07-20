const library = [];

// create constructor object for Books
function Book(title, author, pages, genre) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.genre = genre;
}

//function for book display
function displayBook() {
	var counter = 0;
	const parentDiv = document.querySelector('.list');
	//create new div for each entry
	
	parentDiv.innerHTML = '';
	library.forEach((newEntry, index) => {
		counter++;
		const book = document.createElement('div');
		book.classList.add('displayEntry');
	
		//create a div for each element of each book for styling
		const bookTitle = document.createElement('div');
		bookTitle.className = 'bookTitles';
		bookTitle.textContent = newEntry.title;
		
		const bookAuthor = document.createElement('div');
		bookAuthor.className = 'bookAuthors';
		bookAuthor.textContent = newEntry.author;
		
		const bookPages = document.createElement('div');
		bookPages.className = 'bookPages';
		bookPages.textContent = newEntry.pages;
		
		const bookGenre = document.createElement('div');
		bookGenre.className = 'bookGenre';
		bookGenre.textContent = newEntry.genre;
		
		//add a new value to the book to access its index;
		newEntry.removalIndex = index;
		
		const remove = document.createElement('button');
		remove.addEventListener('click', deleteBook);
		remove.textContent = 'Remove entry';
		
		//append the sub divs
		book.appendChild(bookTitle);
		book.appendChild(bookAuthor);
		book.appendChild(bookPages);
		book.appendChild(bookGenre);
		book.appendChild(remove);
		
		//append the whole entry to the mainline
		parentDiv.appendChild(book);
	});
	
	const bookTally = document.getElementById('books-total');
	bookTally.innerHTML = 'Books in your library: ' + counter;
}

//create click events for the buttons.
const bookButton = document.getElementById('book-button');
bookButton.addEventListener('click', addBook);

function addBook() {
	const newForm = document.createElement("form");
	newForm.innerHTML = `
		<label for="title">Title:</label>
		<input type="text" id="title" required><br>
		
		<label for="author">Author:</label>
		<input type="text" id="author" required><br>
		
		<label for="pages">Pages:</label>
		<input type="number" id="pages" required><br>
		
		<fieldset>
			<legend>Genre:</legend>
			<input type="radio" id="sci-fi" name="genre" value="Sci-fi">
			<label for="sci-fi">Sci-Fi</label><br>
			<input type="radio" id="fiction" name="genre" value="Fiction">
			<label for="fiction">Fiction</label><br>
			<input type="radio" id="mystery" name="genre" value="Mystery">
			<label for="mystery">Mystery</label><br>
			<input type="radio" id="horror" name="genre" value="Horror">
			<label for="horror">Horror</label><br>
			<input type="radio" id="non-fiction" name="genre" value="Non-fiction">
			<label for="non-fiction">Non-fiction</label><br>
		</fieldset>
		
		<button type="submit">Add book</button>
	`;
	
	newForm.onsubmit = (event) =>  {
		event.preventDefault();
		
		const title = newForm.querySelector("#title").value;
		const author = newForm.querySelector("#author").value;
		const pages = newForm.querySelector("#pages").value;
		const genre = newForm.querySelector('input[name=genre]:checked').value;
		const newBook = new Book(title, author, pages, genre);
        library.push(newBook);
		
		displayBook();
		newForm.reset()
	}
	const formContainer = document.getElementById("bookFormContainer");
    formContainer.appendChild(newForm);
}

function deleteBook(index) {
	library.splice(index, 1);
	displayBook();
}


	