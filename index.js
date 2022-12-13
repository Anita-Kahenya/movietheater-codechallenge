//first i take the data from the db.json
const movie= document.querySelector("#moviedetails")
let films = []
let id = 0
function getMoviesData (url){
    fetch(url, {
        method:"GET",
        headers: {
            "X-Master-Key" : "$2b$10$.PDAmlgr1Tbjg/pEtIqQH.v1jwP0ZJEXajNZz5L/rFYWK.21kkwDC"
        }

    })
    .then(res=>res.json())
    .then((data)=>{
        createPoster(data.record.films)
    })
}
getMoviesData("https://api.jsonbin.io/v3/b/639853dc811f2b20b0872e0f/latest")


function createPoster(posters){
    console.log(posters)
    filmInfo(posters[0])
    for(let poster of posters){
        films[poster.id -1] = poster
        showpost(poster)
    }
}
// taking the poster pic from the data base
function showpost(poster){
    let newMovies= document.getElementById("upcomingMovies")
    let icon = document.createElement("img")
    let li=document.createElement("div")
    li.classList.add("li")
    li.appendChild(icon)
    icon.setAttribute("src", poster.poster)
    icon.addEventListener("click",(event)=> {
        filmInfo(poster)
    } )
    newMovies.appendChild(li)


}
// this function take elements from html and  db.json displays the right required elements
function filmInfo(poster){
    //subtracting the current id on the db.json to get the current id of the film
    id = poster.id-1
    const img= document.getElementById("pic")
    img.setAttribute("src", poster.poster)
    movie.appendChild(img)
    document.querySelector("#title").textContent=poster.title
    document.querySelector("#runtime").textContent=poster.runtime
    document.querySelector("#showtime").textContent=poster.showtime
    document.querySelector("#tickets").textContent= poster.tickets_sold
    document.querySelector("#description").textContent=poster.description
    document.querySelector("#availableTicket").textContent=poster.capacity-poster.tickets_sold
//creating  a nested if statement that works on the buybutton changing the current state afer an action  has taken place
    if(films[poster.id-1]) {
        if(films[poster.id-1].tickets_sold===films[poster.id-1].capacity){
            document.getElementById("selltickets").textContent = "Sold Out!"
        }else{
            document.getElementById("selltickets").textContent = "Buy Ticket"
        }
    }
}
function presentTickets() {
    const ticket=document.getElementById("tickets")
       if (this.tickets_sold <= this.capacity-1){
            let intial=parseInt(ticket.textContent)
            ticket.textContent=intial+1
            this.tickets_sold = intial+1
            
            if(films[this.id-1].tickets_sold===films[this.id-1].capacity){
                document.getElementById("selltickets").textContent = "Sold Out!"
            }else{
                document.getElementById("selltickets").textContent = "Buy Ticket"
            }

            document.querySelector("#availableTicket").textContent=this.capacity-(intial+1)
       }
}
const button=document.getElementById("selltickets")
button.addEventListener("click",(e)=>{
    presentTickets.call(films[id])
})