import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./gallery.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import GalleryCategoryTabs from "./galleryCategoryTabs";
import LazyImage from "../../../LazyImg";
import Pagination from '../../../components/SubNoti/Pagination'; // 페이지네이션 컴포넌트 import
import GallerySearchBar from './gallerySearchBar'; // 갤러리용 서치바 컴퍼넌트 import
import ScrollToTop from "../../../scroll";
import "swiper/css";
import "swiper/css/autoplay";

const Gallery = ({ images }) => {
  const { key } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGroup, setCurrentGroup] = useState(1);
  const [pageGroupSize, setPageGroupSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('title');
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    setFilteredImages(images.filter(image => image.key === key && image.category === "축제사진"));
  }, [key, images]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPageGroupSize(4);
      } else {
        setPageGroupSize(5);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = () => {
    const searchFilteredImages = images.filter(image => image.key === key && image.category === "축제사진").filter(image => {
      if (searchField === 'title') {
        return image.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchField === 'content') {
        return image.content.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    });
    setFilteredImages(searchFilteredImages);
    setCurrentPage(1); // 검색 후 페이지를 첫 페이지로 설정
    setCurrentGroup(1); // 검색 후 그룹을 첫 그룹으로 설정
  };

  // 페이지네이션을 위한 상태를 정의
  const postsPerPage = 12; // 한 페이지에 노출될 게시물 수

  // 현재 페이지에 해당하는 게시물의 인덱스를 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredImages.slice(indexOfFirstPost, indexOfFirstPost + postsPerPage);

  // 페이지 번호를 클릭했을 때 실행되는 핸들러
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 이전 페이지 그룹으로 이동하는 핸들러
  const handlePreviousGroup = () => {
    if (currentGroup > 1) {
      setCurrentGroup(currentGroup - 1);
      setCurrentPage((currentGroup - 2) * pageGroupSize + 1);
    }
  };

  // 다음 페이지 그룹으로 이동하는 핸들러
  const handleNextGroup = () => {
    if (currentGroup * pageGroupSize < Math.ceil(filteredImages.length / postsPerPage)) {
      setCurrentGroup(currentGroup + 1);
      setCurrentPage(currentGroup * pageGroupSize + 1);
    }
  };

  // 총 페이지 수를 계산
  const totalPageCount = Math.ceil(filteredImages.length / postsPerPage);

  return (
    <>
      <div className="subTopGal subGalleryTop">
        <p className="subTopText">갤러리</p>
      </div>
      <section className="subGal">
        <GalleryCategoryTabs />
        <div className="ImgSwap">
          <select
            className="cate"
            value={key}
            onChange={(e) =>
              (window.location.href = `/Team_Period/gallery/category/${e.target.value}`)
            }
          >
            <option value="starLigth">별빛야행</option>
            <option value="moonLight">달빛기행</option>
          </select>
        </div>
        <div className="galImgSec1">
          <div className="galImgSec1_inner">
            <div className="mainImgWrap">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1280: {
                    slidesPerView: 3,
                  },
                }}
                loop={true}
                loopedslides={1}
                speed={6000}
                className="mainSwiper"
              >
                {filteredImages.slice(0, 5).map((image, index) => (
                  <SwiperSlide key={index} className="mainSlide">
                    <div>
                      <LazyImage
                        src={image.src}
                        alt={`${index + 1}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="galImgSec2">
          <div className="gridBox">
            {currentPosts.map((image, index) => (
              <div className={`gridCard${index + 1} gImgCard`} key={index}>
                <Link to={`/gallery/detail/${image.id}`}>
                  <LazyImage
                    src={image.src}
                    alt={`${index + 1}`}
                  />
                  <div className="imageDetails">
                    <h3>{image.title}</h3>
                    <p>작성자: {image.author}</p>
                    <p className="content">{image.content}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPageCount={totalPageCount}
          currentGroup={currentGroup}
          pageGroupSize={pageGroupSize}
          onPageChange={handleClick}
          onPreviousGroup={handlePreviousGroup}
          onNextGroup={handleNextGroup}
        />
        <div className='pageBtnWrap writeBtn'>
            <Link to="/Gallery/category/create" className="subBtn notiWrite">글쓰기</Link>
        </div>
        <ScrollToTop />
        <GallerySearchBar
          searchField={searchField}
          setSearchField={setSearchField}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      </section>
    </>
  );
};

export default Gallery;
