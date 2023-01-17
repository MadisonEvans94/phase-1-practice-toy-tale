let addToy = false;
const toysURL = "http://localhost:3000/toys";
const toyCollection = document.querySelector("#toy-collection");
/*TODO: 
  1. initial GET request on page load (done)
  2. helper function for create a card html element using JS (done)
  3. populating cards with data from server (done)
  4. helper function for Like button, start with console logging response
  5. update server with like 
*/

// helper function for updating the server
function updateServer(toy) {
	fetch(`http://localhost:3000/toys/${toy.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			id: toy.id,
			name: toy.name,
			image: toy.image,
			likes: toy.likes,
		}),
	})
		.then(() => console.log("server updated"))
		.catch((error) => {
			console.log("server issue :( ... see below for status");
			console.log(error.message);
		});
}

function renderCard(toy) {
	//card parent element
	const card = document.createElement("div");
	card.className = "card";

	// card title h2 child element
	const cardTitle = document.createElement("h2");
	cardTitle.textContent = toy.name;
	card.appendChild(cardTitle);

	// card image child element
	const cardImage = document.createElement("img");
	cardImage.className = "toy-avatar";
	cardImage.src = toy.image;
	card.appendChild(cardImage);

	// Like count h2 child element
	const cardLikes = document.createElement("h2");
	cardLikes.textContent = `${toy.likes} Likes`;
	card.appendChild(cardLikes);

	// Like button child element
	const cardLikeButton = document.createElement("button");
	cardLikeButton.textContent = "Like";
	cardLikeButton.addEventListener("click", () => {
		toy.likes++;
		console.log(toy);
		updateServer(toy);

		cardLikes.textContent = `${toy.likes} Likes`;
	});
	card.appendChild(cardLikeButton);
	toyCollection.appendChild(card);
}
function getToysFromServer() {
	console.log("Loading");
	fetch(toysURL)
		.then((toysURL) => toysURL.json())
		.then((toys) => {
			console.log(toys);
			toys.forEach((toy) => renderCard(toy));
		});
}

document.addEventListener("DOMContentLoaded", () => {
	getToysFromServer();
	const addBtn = document.querySelector("#new-toy-btn");
	const toyFormContainer = document.querySelector(".container");
	addBtn.addEventListener("click", () => {
		// hide & seek with the form
		addToy = !addToy;
		if (addToy) {
			toyFormContainer.style.display = "block";
		} else {
			toyFormContainer.style.display = "none";
		}
	});
});
