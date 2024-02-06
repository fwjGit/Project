import React from 'react';
import { Button, Card, Container, Paper, TextareaAutosize } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {createBrowserHistory} from 'history';

function ArticleEdit(props) {
    const [state, setState] = useState({ article: {} });

    const currentLocation = useLocation();
    const history = createBrowserHistory();

    const editArticle=()=>{
        var url;
        if(currentLocation.state===null){
            var string=currentLocation.pathname.replace('/edit','');
            url=`http://localhost:3000${string}`
            //url=`http://reactnode-api.com${string}`
        }else{
            url=`http://localhost:3000/articles/${currentLocation.state}`
            //url=`http://reactnode-api.com/articles/${currentLocation.state}`  // nginx 部署
        };
        fetch(url,{
            method: 'PATCH',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                content: state.article.content
            })
        }).then((res) => {
            return res.json()
        }).then((res) => {
            history.push(currentLocation.pathname);
        }).catch((err) => {
            alert(err.message);
            alert('编辑文章内容失败');
        });
    };

    const fetchArticle=()=>{
        var url;        
        if(currentLocation.state===null){
            const string=currentLocation.pathname.replace('/edit','');
            url=`http://localhost:3000${string}`
            //url=`http://reactnode-api.com${string}`
        }else{
            url=`http://localhost:3000/articles/${currentLocation.state}`
            //url=`http://reactnode-api.com/articles/${currentLocation.state}`
        };
        fetch(url)
          .then((res) => {
                return res.json()
            }).then((res) => {
                setState({...state, article: res });
            }).catch((err) => {
                alert(err.message);
                alert('获取文章详情失败');
            });
    };

    useEffect(() => {
        fetchArticle();
    }, []);

    return (
        <div>
            <Container maxWidth='md'>
                <Card>
                    <Paper style={{marginBottom:16}}>{state.article.title}</Paper>
                    <TextareaAutosize
                        style={{ width: '100%' }}
                        value={state.article.content}
                        onChange={(e) => {
                            setState({ article: { ...state.article, content: e.currentTarget.value } });
                        }}
                    />
                    <Button color='primary' style={{float:'right',marginTop:16}} onClick={()=>editArticle()}>
                        提交
                    </Button>
                </Card>
            </Container>
        </div>
    );
}

export default ArticleEdit;