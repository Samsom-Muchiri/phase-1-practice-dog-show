document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dog-form')
    form.addEventListener('submit', e =>{
        e.preventDefault()
        applyEdit()
    })
})

//fetch data from server

const baseURL = "http://localhost:3000/dogs"

function fetchData(){
    fetch(baseURL)
  .then(res => {
    if (!res.ok) {
      throw new Error('Failed to fetch data from the server');
    }
    return res.json();
  })
  .then(data => {
    // Process the fetched data
    processObject(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error.message);
  });

}
fetchData()

// Append registerd dogs

function processObject(data){
    const table = document.getElementById('table-body')
    let rowHTML = ''
    for (let i = 0; i < data.length; i++){
        
        const details = data[i]
        const name = details.name
        const breed = details.breed
        const sex = details.sex
        const id = details.id
        const tableRow = `
        <tr id="tr${id}">
            <td id="name">${name}</td>
            <td id="breed">${breed}</td>
            <td id="sex">${sex}</td>
            <td><a href="#top"><button class="btn">Edit</button></a></td>
        </tr>
        `
        rowHTML += tableRow
    }
     table.innerHTML = rowHTML
}

// Edit dog
const table = document.getElementById('table-body');
table.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    editDog(e);
  }
});

function editDog(e) {
  const btn = e.target;
  const tr = btn.parentElement.parentElement.parentElement;
  const id = tr.getAttribute("id")
  const name = tr.querySelector('#name').innerText
  const breed = tr.querySelector('#breed').innerText
  const sex = tr.querySelector('#sex').innerText
  const nameInput = document.getElementById('input-name')
  nameInput.value = name
  const breedInput = document.getElementById('input-breed')
  breedInput.value = breed
  const sexInput = document.getElementById('input-sex')
  sexInput.value = sex
  const form = document.getElementById('dog-form')
  form.setAttribute("data-count", `${id}`)
}


// Apply the eddits

function applyEdit(){
    const nameInput = document.getElementById('input-name').value
    const breedInput = document.getElementById('input-breed').value
    const sexInput = document.getElementById('input-sex').value
    const update = {name: `${nameInput}`,
                    breed: `${breedInput}`,
                    sex: `${sexInput}`
                    }
    const form = document.getElementById('dog-form')
    const id = form.getAttribute("data-count").replace("tr", "")
    updataServer(id, update)
}

//updata server

function updataServer(id, update){
    fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(update)
    })
    .then(res => {
        if(!res.ok){
            throw new Error("Failed to update data")
        }
        console.log(res.json())
       return res.json()
    })
    .catch(error => console.log(error))
}