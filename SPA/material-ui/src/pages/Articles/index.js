import React from "react";
import {
  Button,
  Container,
  Card,
  CardActions,
  Grid,
  TextField,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Articles(props) {
  const [state, setState] = useState({
    articles: [
      {
        title: "title",
        subtitle: "subtitle",
      },
    ],
    search_text: "",
  });

  const navigate = useNavigate();

  const fetchArticles = () => {
    fetch(`http://localhost:3000/articles?search_text=${state.search_text}`)
    //fetch(`http://reactnode-api.com/articles?search_text=${state.search_text}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setState({ ...state, articles: res });
      })
      .catch((err) => {
        alert(err.message);
        alert("获取文章列表失败");
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const toArticleDetail = (item) => {
    const id = item.id;
    navigate(`/articles/${id}`, { state: `${id}` });
  };

  return (
    <div>
      <Container maxWidth="md">
        <Card style={{ padding: "20px" }}>
          <Grid Container>
            <Grid item xs={6}>
              <TextField
                placeholder="搜索标题或内容"
                value={state.search_text}
                onChange={(e) =>
                  setState({ ...state, search_text: e.currentTarget.value })
                }
              />
              <Button color="primary" variant="contained" onClick={() => fetchArticles()} style={{float:'right'}}>
                Search!
              </Button>
            </Grid>
          </Grid>
        </Card>
        {state.articles.length
          ? state.articles.map((item) => {
            return (
              <Card key={item.id} style={{ padding: "16px" }}>
                <p>{item.title}</p>
                <span>{item.subtitle}</span>
                <CardActions>
                  <Button size="small" onClick={() => toArticleDetail(item)}>Learn More</Button>
                </CardActions>
              </Card>
            );
          })
          : null}
      </Container>
    </div>
  );
}

export default Articles;
