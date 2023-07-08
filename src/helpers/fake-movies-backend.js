export { fakeMovieBackend };

// memoire tempo pour les films
const movieKey = 'Secret key';
let movies = JSON.parse(localStorage.getItem(movieKey)) || [];

function fakeMovieBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            //on arret apres 500
            setTimeout(handleRouteMovies ,500);

   
             // pour les movies
            function handleRouteMovies(){
                switch (true) {
                    /*case url.endsWith('/users/authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && opts.method === 'POST':
                        return register();*/
                    case url.endsWith('/movies') && opts.method === 'GET':
                        return getMovies();
                    case url.match(/\/movies\/\d+$/) && opts.method === 'GET':
                        return getMovieById();
                    case url.match(/\/movies\/\d+$/) && opts.method === 'PUT':
                        return updateMovie();
                    case url.match(/\/movies\/\d+$/) && opts.method === 'DELETE':
                        return deleteMovie();
                    default:
                        //si le URL n'est pas mentionné si haut 
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }




            // route functions 
            function getMovies() {
                
                return ok(movies.map(x => moviesDetails(x)));
            }

            function getMovieById() {                

                const movies = movies.find(x => x.id === idFromUrl());
                return ok(moviesDetails(movies));
            }

            function updateMovie() {
               

                let params = body();
                let movies = movies.find(x => x.id === idFromUrl());

                // regarde si il y a un changement sur le mot de passe ainsi que le film favoris,sinon rien
                if (!params.password) {
                    delete params.password;
                }
                if (!params.favoriteMovie) {
                    delete params.favoriteMovie;
                }

                // vérifie que le Nom du film  est unique
                if (params.movieName !== movies.movieName && movies.find(x => x.movieName === params.movieName)) {
                    return error('This movie title  "' + params.movieName + '" already exist in our database')
                }

                // update and save new movie
                Object.assign(movies, params);
                localStorage.setItem(moviesKey, JSON.stringify(movies));

                return ok();
            }

            function deleteMovie() {
               

                movies= movies.filter(x => x.id !== idFromUrl());
                localStorage.setItem(moviesKey, JSON.stringify(movies));
                return ok();
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
            }

            /*function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) })
            }

            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
            }*/

          

            function moviesDetails(movies){
                const {id,movieName,type,description,rating} = movies;
                return {id,movieName,type,description,rating};

            }        

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                }
            }
        });
    }
}
