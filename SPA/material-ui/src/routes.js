import React from 'react'
import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom'
import Articles from './pages/Articles/index'
import ArticleDetail from './pages/ArticleDetail/index';
import ArticleEdit from './pages/ArticleEdit/index';

function RoutesArticles(props) {
  return (
    <BrowserRouter {...props}>
        <Routes>
            <Route exact path="/articles" element={<Articles />} replace></Route>
            <Route exact path="/articles/:id" element={<ArticleDetail />} replace></Route>
            <Route exact path="/articles/:id/edit" element={<ArticleEdit />} replace></Route>
            <Route path="*" element={<Navigate to="/articles" replace/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default RoutesArticles