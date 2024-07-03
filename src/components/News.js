import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `InfoSphere - ${capitalizeFirstLetter(props.category)}`;
    fetchNews();
    // eslint-disable-next-line
  }, []);

  const fetchNews = async () => {
    props.setProgress(20);
    try {
      setLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      props.setProgress(40);
      const parsedData = await response.json();
      props.setProgress(60);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(80);
    } catch (error) {
      console.error("Error fetching the news articles:", error);
      setLoading(false);
      setError(error);
    }
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
      const response = await fetch(url);
      const parsedData = await response.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the news articles:", error);
      setLoading(false);
      setError(error);
    }
  };

  if (loading) {
    return <Spiner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spiner />}
      >
        <h2 className="text-center" style={{ margin: "35px 0px" , marginTop: '90px'}}>
          {`Top ${capitalizeFirstLetter(props.category)} Headlines`}
        </h2>
        <div className="container my-3">
          <div className="row my-5">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://imgs.search.brave.com/RXjbSrao3VISlUQ2wGv2S9l9g4CcVFJpdYhFEw3TVbM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9h/L2FjL05vX2ltYWdl/X2F2YWlsYWJsZS5z/dmc.svg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
