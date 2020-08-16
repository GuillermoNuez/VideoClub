import React, { Component } from "react";
import Navbar from "./navbar.component";

//Component that is used to display the genre tags and company tags

const Genre = (props) => <p className="genre">{props.genre.name}</p>;

export default class ViewFilm extends Component {
  constructor(props) {
    super(props);

    this.printGenres = this.printGenres.bind(this);
    this.printCompanies = this.printCompanies.bind(this);
    this.state = {
      movie: "",
      genres: [],
      companies: [],
      runtime: "Not specified",
      release_date: "Not specified",
      overview: "Overview not specified",
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.props.match.params.id +
        "?api_key=89f05d85f1faf7954783a66526994a3e&language=en-US"
    )
      .then((movie) => movie.json())
      .then((movie) => {
        if (movie.success !== false) {
          this.setState({
            movie: movie,
            genres: movie.genres,
            companies: movie.production_companies,
          });

          if (movie.release_date !== "") {
            this.setState({
              release_date: movie.release_date,
            });
          }

          if (movie.overview !== "") {
            this.setState({
              overview: movie.overview,
            });
          }

          console.log(movie);
          if (this.state.movie.runtime > 0) {
            var hours = this.state.movie.runtime / 60;
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);

            if (rhours === 0) {
              this.setState({
                runtime: rminutes + " minute(s).",
              });
            } else {
              this.setState({
                runtime: rhours + " hour(s) and " + rminutes + " minute(s).",
              });
            }
          }
        }
      });
  }

  //Function that prints the film genres

  printGenres() {
    if (this.state.genres.length > 0) {
      return this.state.genres.map((currentgenre) => {
        return <Genre genre={currentgenre} />;
      });
    } else {
      return <p>No genres tagged</p>;
    }
  }

  //Function that prints the film companies

  printCompanies() {
    if (this.state.companies.length > 0) {
      return this.state.companies.map((currentcompany) => {
        return <Genre genre={currentcompany} />;
      });
    } else {
      return <p>No companies tagged</p>;
    }
  }

  render() {
    if (this.state.movie !== "") {
      return (
        <div>
          <Navbar />
          <div className="container">
            <img
              className="image"
              alt="poster"
              src={
                "http://image.tmdb.org/t/p/original/" +
                this.state.movie.poster_path
              }
            ></img>
            <div className="info_container">
              <div>
                <div className="film-row">
                  <h1>{this.state.movie.title}</h1>
                  <p className="score">{this.state.movie.vote_average}</p>
                </div>
                <p>{this.state.overview}</p>
                <p>
                  <span className="bold">Release date: </span>
                  {this.state.release_date}
                </p>
                <p>
                  <span className="bold">Runtime: </span>
                  {this.state.runtime}
                </p>
              </div>
              <div className="info_container">
                <p id="companies">Production Companies</p>
                <div className="genreList">{this.printCompanies()}</div>
              </div>
              <div className="info_container">
                <p id="genres">Genres</p>
                <div className="genreList">{this.printGenres()}</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar />
          <div className="film-list">
            <p className="oops">OOops!! Wrong film URL</p>
          </div>
        </div>
      );
    }
  }
}
