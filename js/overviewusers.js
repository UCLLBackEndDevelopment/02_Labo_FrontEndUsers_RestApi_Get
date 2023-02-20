const users = []
let adults = "no"
const oldest = []
const filterByAdults = document.getElementById("filterByAdults")
const caption = document.querySelector("table>caption")
const ageInput = document.getElementById("ageInput")
const minAge = document.getElementById("minAge")
const maxAge = document.getElementById("maxAge")
const oldestUser = document.getElementById("oldestUser")
const showAllGames = document.getElementById("showAllGames")
const resetFilters = document.getElementById("resetFilters")
const mainTitle = document.querySelector("main>h2")

const toString = (user) =>
  `${user.name} is the oldest user with age ${user.age}`

const renderUsers = () => {
  clearTableRows({ tableBody: "my-users-table-body" })
  oldestUser.innerHTML = toString(oldest[0])
  if (users.length) {
    users
      .forEach((user) => {
        tableRow = createTableRow();
        addTableCell({ tableRow, value: user.name });
        addTableCell({ tableRow, value: user.email });
        addTableRow({
          tableBody: document.getElementById("my-users-table-body"),
          tableRow,
        })
      })
  } 
}

const fetchAndRenderUsers = async () => {
  await (async () => {
    let response, responseOldest;
    if (adults === "yes") {
      caption.innerHTML = `Adult users`;
      response = await fetch(
        "http://localhost:8080/users/adults"
      );
    } 
    else if (minAge.value.length && maxAge.value.length) {
      response = await fetch(
        "http://localhost:8080/users/search/age/" + minAge.value + "/" + maxAge.value)
    }else {
      caption.innerHTML = ""
      response = await fetch("http://localhost:8080/users")
    }
    const result = await response.json()
    users.length = 0
    users.push(...result)
    responseOldest = await fetch("http://localhost:8080/users/oldest")
    const resultOldest = await responseOldest.json()
    oldest.length = 0
    oldest.push(resultOldest)
  })()

  renderUsers()
}

const addEventListeners = () => {
  filterByAdults.addEventListener("click", () => {adults="yes"
    fetchAndRenderUsers()})
  resetFilters.addEventListener("click", () => {
    adults = "no"    
    maxAge.value = ""
    minAge.value = ""
    caption.innerHTML = ""
    fetchAndRenderUsers()
  });

}

addEventListeners()
fetchAndRenderUsers()
setInterval(fetchAndRenderUsers, 1000)
