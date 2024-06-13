import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from './pages/main/main';
import Header from './components/common/header/header';
import Footer from './components/common/footer/footer';

import PostDetail from './components/SubNoti/PostDetail';
import CreatePost from './components/SubNoti/CreatePost';
import EditPost from './components/SubNoti/EditPost';
import AllMenuPage from './components/common/allMenuPage/allMenu';
import NotiList from './components/SubNoti/notiList';
import { posts as initialPosts } from './pages/main/Sec6NotiList/data';

import { Kinfo, Cinfo, Kpro, Cpro, Kticket, Cticket } from './pages/subPages/fesInfo/subFesInfoPages';

import Gallery from "./pages/subPages/gallery/gallery";
import DetailPage from "./pages/main/Sec7_Gallery/subGalleryDetaill";
import GalleryReview from "./pages/subPages/gallery/galleryTourReviwe";
import DetailPageReview from "./pages/subPages/gallery/galleryTourReviweDetail";
import { galleryImages } from "./image";

import Faq from './pages/subPages/faq/faq';
import QnaEditPost from './pages/subPages/faq/qnaEdit';
import QnaList from './pages/subPages/faq/qnaList';
import QnaCreatePost from './pages/subPages/faq/qnaCreate';
import QnaDetail from './pages/subPages/faq/qnaDetail';
import { posts1 as initialPosts1 } from './pages/subPages/faq/qnaData';

// import { resposts as ResInitialPosts } from './pages/subPages/nearInfo/ResDb';
// import ResList from './pages/subPages/nearInfo/ResLi';
// import ResDetail from './pages/subPages/nearInfo/ResDetail';
// import ResPost from './pages/subPages/nearInfo/ResNew';
// import ResEditPost from './pages/subPages/nearInfo/ResEdit';


function App() {
    const [images, setImages] = useState(galleryImages);
    const [isMenuVisible, setIsMenuVisible] = useState(false); // 메뉴 가시성을 관리하는 상태
    const [posts, setPosts] = useState(initialPosts); // 초기 상태 설정 / onDelete 삭제함수 호출 후 초기상태설정하는데 사용

    const handleDeletePost = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
    };

    const handleDelete = (id) => {
        const updatedImages = images.filter((image) => image.id !== id);
        setImages(updatedImages);
      };

    const [posts1, setPosts1] = useState(initialPosts1); // 초기 상태 설정 / onDelete 삭제함수 호출 후 초기상태설정하는데 사용

    const handleDeletePost1 = (postId) => {
        const updatedPosts = posts1.filter(post => post.id !== postId);
        setPosts1(updatedPosts);
    };
    // const [resposts, setResPosts] = useState(ResInitialPosts); // 초기 상태 설정 / onDelete 삭제함수 호출 후 초기상태설정하는데 사용

    // const ReshandleDeletePost = (postId) => {
    //     const updatedPosts = posts1.filter(post => post.id !== postId);
    //     setPosts1(updatedPosts);
    // };
  
  
    return (
        <>
            <Header setIsMenuVisible={setIsMenuVisible} /> {/* Header에 상태 설정 함수를 전달 */}
            {isMenuVisible ? (
                <AllMenuPage setIsMenuVisible={setIsMenuVisible} /> // 전체 메뉴가 보이는 상태일 때 AllMenuPage를 렌더링
            ) : (
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/notiList/category/:key" element={<NotiList posts={posts} setPosts={setPosts} />} />
                    <Route path="/notiList/post/:id" element={<PostDetail posts={posts} onDelete={handleDeletePost} />} />
                    <Route path="/notiList/create" element={<CreatePost />} />
                    <Route path="/notiList/edit/:id" element={<EditPost posts={posts} setPosts={setPosts} />} />
                    <Route path='/Kinfo' element={<Kinfo />} />
                    <Route path='/Cinfo' element={<Cinfo />} />
                    <Route path='/Kprogram' element={<Kpro />} />
                    <Route path='/Cprogram' element={<Cpro />} />
                    <Route path='/Kticket' element={<Kticket />} />
                    <Route path='/Cticket' element={<Cticket />} />
                    <Route path='/Faq' element={<Faq />} />
                    <Route path="/QnaList/category/:key" element={<QnaList posts={posts1} setPosts={setPosts1} />} />
                    <Route path="/QnaList/post/:id" element={<QnaDetail posts={posts1} onDelete={handleDeletePost1} />} />
                    <Route path="/QnaList/create" element={<QnaCreatePost />} />
                    <Route path="/QnaList/edit/:id" element={<QnaEditPost posts={posts1} setPosts={setPosts1} />} />
                    <Route path='/Gallery' element = {<Gallery/>}/>
                    <Route path='/Gallery/Detail/:id' element = {<DetailPage/>}/>
                    {/* <Route path="/ResLi/category/:key" element={<ResList posts={resposts} setPosts={setResPosts} />} />
                    <Route path="/ResLi/post/:id" element={<ResDetail posts={resposts} onDelete={ReshandleDeletePost} />} />
                    <Route path="/ResLi/create" element={<ResPost />} />
                    <Route path="/ResLi/edit/:id" element={<ResEditPost posts={resposts} setPosts={setResPosts} />} /> */}
                     <Route path="/Gallery/category/:key"element={<Gallery images={images} onDelete={handleDelete} />}/>
                     <Route path="/Gallery/category2/:key"element={<GalleryReview images={images} onDelete={handleDelete} />}/>
                     <Route path="/Gallery/Detail/:id" element={<DetailPage onDelete={handleDelete} />}/>
                     <Route path="/Gallery/Detail2/:id" element={<DetailPageReview onDelete={handleDelete} />}/>
                </Routes>
            )}
            <Footer />
        </>
    );
}

export default App;
