function run(event) {
    event.preventDefault();
    update()

}

function update(page = 1) {
    htttpRequest = new XMLHttpRequest();
    user = document.getElementById("check").value
    year = document.getElementById("years").value
    // console.log(user, year);
    if (user.length < 3) {
        htttpRequest.open("GET", "https://www.omdbapi.com/?type=movie&r=json&t=" + user + "&page=" + page + "&y=" + year + "&apikey=55aa098", true)
        // console.log(user.length);
    } else {
        htttpRequest.open("GET", "https://www.omdbapi.com/?type=movie&r=json&s=" + user + "&page=" + page + "&y=" + year + "&apikey=55aa098", true)
    }

    htttpRequest.onprogress = function () {
        var loading = ''
        loading += '<div class="loading">' +
            '<div class="dot dot1"></div>' +
            '<div class="dot dot2"></div>' +
            '<div class="dot dot3"></div>' +
            '</div>'


        document.getElementById("test").innerHTML = loading
     

    }
  
    htttpRequest.send()
    if (user.length >= 3) {
        htttpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                user_data = JSON.parse(this.responseText)
                if (user_data.Response === "True") {

                    var output = ''
                    // console.log(user_data.Search);
                    // m = JSON.stringify(user_data.Search[1].Title)
                    // console.log(user_data);
                    for (var i in user_data.Search) {
                        // m = JSON.stringify(user_data.Search[1].imdbID)
                        // console.log(user_data.Search[i].imdbID.substring(2));
                        output +=
                            '<div class ="movie-card">'

                        if (user_data.Search[i].Poster === "N/A") {
                            output +=
                                '<img src="./images/movie.png" alt ="Movie" ">'
                        } else {
                            output +=
                                '<img src=" ' + user_data.Search[i].Poster + '" alt ="Movie" ">'
                        }


                        output +=

                            '<span> ' + user_data.Search[i].Title + '</span>' +
                            '<span> ' + user_data.Search[i].Year + '</span>' +

                            '<p><a onclick="movieDetails(' + "1" + user_data.Search[i].imdbID.substring(2) + ')" " href="#">Movie Details</a></p> ' +

                            '</div>'


                    }
                   

                    document.getElementById("test").innerHTML = output

                    user_data = JSON.parse(this.responseText)

                    var b = parseInt(user_data.totalResults)
                    b = b / 10
                    b = parseInt(b)
                    
             



                    if (b > 0) {
                        var output = '<div class="pages"> <select id="page" name="page" onchange ="update(this.value)" >'
                        output += ' <option value=""> page </option>'

                        for (let i = 1; i < b + 1; i++) {
                            output +=
                                ' <option value=" ' + i + '  "> ' + i + '</option>'

                        }
                        output += '</select> </div>'
                        document.getElementById("para").innerHTML = output



                    } else {
                        document.getElementById("para").innerHTML = output = ''
                    }

                } else {
                    var errormovie = ''
                    errormovie += '<div class ="error-card">' +
                        '<img src="./images/Error.png" ">' +
                        '<div class="error-text">Try Again</div>' +

                        '</div>'
                    document.getElementById("test").innerHTML = errormovie

                }
            }
        }
    } else {
        htttpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                user_data = JSON.parse(this.responseText)
                if (user_data.Response === "True") {

                    var output = ''
                    // console.log(user_data);
                    // m = JSON.stringify(user_data.Title)
                    // console.log(user_data);

                    // m = JSON.stringify(user_data.imdbID)
                    // console.log(user_data.imdbID.substring(2));
                    output +=
                        '<div class ="movie-card">'

                    if (user_data.Poster === "N/A") {
                        output +=
                            '<img src="./images/movie.png" alt ="Movie" >'
                    } else {
                        output +=
                            '<img src=" ' + user_data.Poster + '" >'
                    }


                    output +=

                        '<span> ' + user_data.Title + '</span>' +
                        '<span> ' + user_data.Year + '</span>' +

                        '<span><a onclick="movieDetails(' + "1" + user_data.imdbID.substring(2) + ')" class="btn btn-primary" href="#">Movie Details</a></span> ' +

                        '</div>'



                    document.getElementById("test").innerHTML = output

                    // user_data = JSON.parse(this.responseText)

                } else {
                    var errormovie = ''
                    errormovie += '<div class ="error-card">' +
                        '<img src="./images/Error.png" width="70" height="">' +
                        '<div class="error-text">Try Again</div>' +

                        '</div>'
                    document.getElementById("test").innerHTML = errormovie

                }
            }
        }

    }

}

function movieDetails(id) {
    // console.log(id);
    sessionStorage.setItem('movieId', id);
    window.location = './movie.html'
    // console.log(id);
    return false


}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    movieId = movieId.substring(1)
    
    // console.log(movieId);
    htttpRequest = new XMLHttpRequest();
    // m = "https://www.omdbapi.com/?i=tt" + movieId + "&apikey=55aa098"
    // console.log(m);
    


    htttpRequest.open("GET", "https://www.omdbapi.com/?i=tt" + movieId + "&apikey=55aa098", true)
    htttpRequest.onprogress = function () {
        var loading = ''
        loading += '<div class="loading">' +
            '<div class="dot dot1"></div>' +
            '<div class="dot dot2"></div>' +
            '<div class="dot dot3"></div>' +
            '</div>'
        document.getElementById("movie").innerHTML = loading
        // console.log("Loading");
    }
    // htttpRequest.onload =  function(){
    //     document.getElementById("test").innerHTML =  "Loaded"
    // }
    htttpRequest.send()
    htttpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            user_data = JSON.parse(this.responseText)
            var output = ''
            // console.log(user_data);
            // console.log(user_data);
            {
                output +=
                    '<div class ="movie-post">'

                if (user_data.Poster === "N/A") {
                    output +=
                        '<img src="./images/movie.png" alt ="Movie" " >'
                } else {
                    output +=
                        '<img src=" ' + user_data.Poster + '" alt ="Movie" " >'
                }

                output +=
                    '<span>Title :' + user_data.Title + '</span>' +
                    '<span>Year :' + user_data.Year + '</span>' +
                    '<span>Rated :' + user_data.Rated + '</span>' +
                    '<span>Released :' + user_data.Released + '</span>' +
                    '<span>Runtime :' + user_data.Runtime + '</span>' +
                    '<span>Genre :' + user_data.Genre + '</span>' +
                    '<span>Director :' + user_data.Director + '</span>' +
                    '<span>Writer :' + user_data.Writer + '</span>' +
                    '<span>Language :' + user_data.Language + '</span>' +
                    '<span>BoxOffice :' + user_data.BoxOffice + '</span>' +
                    '<span>Production :' + user_data.Production + '</span>' +
                    '<span>Rating :</span>'

                for (var i in user_data.Ratings) {
                    output +=
                        '<span>Source :' + user_data.Ratings[i].Source + ':' + user_data.Ratings[i].Value + '</span>'

                }



                output += '</div>'

            }







            document.getElementById("movie").innerHTML = output









        }
    }


}