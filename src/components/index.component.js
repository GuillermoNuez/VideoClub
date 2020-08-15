import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar.component";

//Component that is used to display the film cards

const Film = (props) => (
  <Link className="film" to={"/Movie/" + props.film.id}>
    <img
      className="film_image"
      src={"http://image.tmdb.org/t/p/original/" + props.film.poster_path}
    ></img>
    <div className="film_info">
      <h3>{props.film.title}</h3>
      <div>
        <div className="film-row">
          <p className="rating">{props.film.vote_average}</p>
          <span>{props.film.release_date}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.FilmList = this.FilmList.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.updateFilmsList = this.updateFilmsList.bind(this);
    this.paginationUp = this.paginationUp.bind(this);
    this.paginationDown = this.paginationDown.bind(this);
    this.toLast = this.toLast.bind(this);
    this.toFirst = this.toFirst.bind(this);

    this.state = {
      movies: [],
      searchimput: "",
      currentpage: 1,
      goBackClass: "hidden",
      totalpages: "",
      totalresults: "",
      goForwardClass: "",
      paginationClass: "current",
      oops: "hidden",
    };
  }

  componentDidMount() {
    this.updateFilmsList(
      "https://api.themoviedb.org/3/movie/popular?api_key=89f05d85f1faf7954783a66526994a3e&language=en-US&page=",
      1
    );
  }

  //Function that prints the films

  FilmList() {
    if (this.state.movies != undefined) {
      return this.state.movies.map((currentfilm) => {
        return <Film film={currentfilm} />;
      });
    }
  }

  //Function that is executed when the pagination forward button is clicked

  paginationUp() {
    this.setState({
      currentpage: this.state.currentpage + 1,
      movies: [],
      goBackClass: "",
    });
    var aux = this.state.currentpage + 1;
    if (this.state.searchimput != "") {
      this.updateFilmsList(
        "https://api.themoviedb.org/3/search/movie?api_key=89f05d85f1faf7954783a66526994a3e&query=" +
          this.state.searchimput +
          "&page=",
        aux
      );
    } else {
      this.updateFilmsList(
        "https://api.themoviedb.org/3/movie/popular?api_key=89f05d85f1faf7954783a66526994a3e&language=en-US&page=",
        aux
      );
    }
  }

  toFirst() {
    this.setState({
      currentpage: 1,
      movies: [],
      goBackClass: "hidden",
    });
    if (this.state.searchimput != "") {
      this.updateFilmsList(
        "https://api.themoviedb.org/3/search/movie?api_key=89f05d85f1faf7954783a66526994a3e&query=" +
          this.state.searchimput +
          "&page=",
        1
      );
    } else {
      this.updateFilmsList(
        "https://api.themoviedb.org/3/movie/popular?api_key=89f05d85f1faf7954783a66526994a3e&language=en-US&page=",
        1
      );
    }
  }

  toLast() {
    this.setState({
      currentpage: this.state.totalpages,
      movies: [],
      goBackClass: "",
    });
    if (this.state.searchimput != "") {
      this.updateFilmsList(
        "https://api.themoviedb.org/3/search/movie?api_key=89f05d85f1faf7954783a66526994a3e&query=" +
          this.state.searchimput +
          "&page=",
        this.state.totalpages
      );
    } else {
      this.updateFilmsList(
        "https://api.themoviedb.org/3/movie/popular?api_key=89f05d85f1faf7954783a66526994a3e&language=en-US&page=",
        this.state.totalpages
      );
    }
  }

  //Function that is executed when the pagination backward button is clicked

  paginationDown() {
    if (this.state.currentpage > 1) {
      this.setState({
        currentpage: this.state.currentpage - 1,
        movies: [],
      });

      var aux = this.state.currentpage - 1;

      if (aux == 1) {
        this.setState({
          goBackClass: "hidden",
        });
      }
      if (this.state.searchimput != "") {
        this.updateFilmsList(
          "https://api.themoviedb.org/3/search/movie?api_key=89f05d85f1faf7954783a66526994a3e&query=" +
            this.state.searchimput +
            "&page=",
          aux
        );
      } else {
        this.updateFilmsList(
          "https://api.themoviedb.org/3/movie/popular?api_key=89f05d85f1faf7954783a66526994a3e&language=en-US&page=",
          aux
        );
      }
    }
  }

  //function that updates the film list taking the query and the page to load as a parameter

  updateFilmsList(query, page) {
    fetch(query + page)
      .then((movies) => movies.json())
      .then((movies) => {
        this.setState({
          totalpages: movies.total_pages,
          totalresults: movies.total_results,
          movies: movies.results,
        });
        var aux = this.state.totalpages;

        if (this.state.currentpage == aux) {
          this.setState({
            goForwardClass: "hidden",
          });
        } else {
          this.setState({
            goForwardClass: "",
          });
        }
        if (aux == 0) {
          this.setState({
            paginationClass: "hidden",
            goForwardClass: "hidden",
            paginationClass: "hidden",
            oops: "oops",
          });
        } else {
          this.setState({
            paginationClass: "current",
            oops: "hidden",
          });
        }
      });
  }

  //Function that is executed every time the imput field changes

  onChangeSearch(e) {
    if (e.target.value == " ") {
      this.setState({
        searchimput: "",
      });
    } else {
      this.setState({
        searchimput: e.target.value,
        movies: [],
        currentpage: 1,
        goBackClass: "hidden",
      });

      if (e.target.value == "") {
        this.setState({
          searchimput: e.target.value,
        });
        this.updateFilmsList(
          "https://api.themoviedb.org/3/movie/popular?api_key=89f05d85f1faf7954783a66526994a3e&language=en-US&page=",
          1
        );
      } else {
        this.updateFilmsList(
          "https://api.themoviedb.org/3/search/movie?api_key=89f05d85f1faf7954783a66526994a3e&query=" +
            e.target.value +
            "&page=",
          1
        );
      }
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="search-box">
          <input
            type="text"
            className="search"
            placeholder="Search movie..."
            value={this.state.searchimput}
            onChange={this.onChangeSearch}
          />
        </div>

        <div className="film-list">
          {this.FilmList()}
          <p className={this.state.oops}>OOops!! Nothing found</p>
        </div>
        <div className="pagination">
          <p className={this.state.goBackClass} onClick={this.toFirst}>
            &#8249;&#8249;
          </p>
          <p className={this.state.goBackClass} onClick={this.paginationDown}>
            &#8249;
          </p>
          <div id="current" className={this.state.paginationClass}>
            <p>{this.state.currentpage}</p>
          </div>
          <p className={this.state.goForwardClass} onClick={this.paginationUp}>
            &#8250;
          </p>
          <p className={this.state.goForwardClass} onClick={this.toLast}>
            &#8250;&#8250;
          </p>
        </div>
      </div>
    );
  }
}
