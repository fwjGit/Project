import React from "react";
import { Container, Card, Button, Paper, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";

function ArticleDetail(props) {
    const [state, setState] = useState({ article: {}, comment: '' });

    const currentLocation = useLocation();
    const navigate = useNavigate();

    const fectchArticle = () => {
        var url;
        if(currentLocation.state===null){
            url=`http://localhost:3000${currentLocation.pathname}`
            //url=`http://reactnode-api.com${currentLocation.pathname}`
        }else{
            url=`http://localhost:3000/articles/${currentLocation.state}`
            //url=`http://reactnode-api.com/articles/${currentLocation.state}`
        };
        fetch(url)
            .then((res) => {
                return res.json()
            }).then((res) => {
                setState({ ...state, article: res });
            }).catch((err) => {
                alert(err.message);
                alert('获取文章失败');
            });
    }

    useEffect(() => {
        fectchArticle();
    }, []);

    const commitComment=()=>{
        var url;
        if(currentLocation.state===null){
            url=`http://localhost:3000${currentLocation.pathname}/comments`
            //url=`http://reactnode-api.com${currentLocation.pathname}/comments`
        }else{
            url=`http://localhost:3000/articles/${currentLocation.state}/comments`
            //url=`http://reactnode-api.com/articles/${currentLocation.state}/comments`
        };
        fetch(url, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                comment: state.comment
            })
        }).then((res) => {
            return res.json();
        }).then((res) => {
            setState({...state, comment:""});
            fectchArticle();
        }).catch((err) => {
            alert(err.message);
            alert('提交文章评论失败');
        });
    };

    const toEditArticle=(item)=>{
        if(currentLocation.state===null){
            navigate(`${currentLocation.pathname}/edit`);
        }else{
            var id=currentLocation.state;
            navigate(`/articles/${id}/edit`, { state: `${id}` });
        };
    };

    return (
        <div>
            <Container maxWidth="md">
                <Card>
                    <h1>{state.article.title}</h1>
                    <h2>{state.article.subtitle}</h2>
                    <span>---{state.article.author} at {state.article.created_at}</span>
                    <p>{state.article.content}</p>
                    <Button color="primary" style={{float:"right", marginTop:10}} onClick={()=>toEditArticle()}>编辑内容</Button>
                </Card>
                <Paper>评论列表</Paper>
                {
                    state.article && state.article.comments ?
                        state.article.comments.map((item) => {
                            return (
                                <Card key={item.id}>
                                    <p>{item}</p>
                                </Card>
                            );
                        }) : null
                }
                <TextField 
                    placeholder="请输入评论"
                    fullWidth
                    value={state.comment}
                    style={{marginTop:16}}
                    onChange={(e)=>setState({...state, comment:e.currentTarget.value})}
                />
                <Button color="primary" style={{float:"right",marginTop:16}} onClick={()=>commitComment()}>
                    发表评论
                </Button>
            </Container>
        </div>
    );
}

export default ArticleDetail;