import * as React from 'react';
import { useState } from 'react';
import './Carousel.scss';
import { ImageViewer } from '../ImageViewer/ImageViewer';

export interface ICarouselProps {
  listItems: any;
  per_page: number
}


export const Carousel = ({ listItems, per_page }: ICarouselProps) => {
  const [obj, setObj] = useState({ id: '', src: '' });
  const firstElement = (listItems && listItems.length > 0 && listItems[0]) || null;
  const [current_page, setCurrentPage] = useState(0);
  let cnt = 0;

  React.useEffect(() => {
    setObj(firstElement);
  }, []);

  function prevPage() {
    if (current_page > 0) {
      setCurrentPage((prestate) => prestate - 1);
    }
  }

  function nextPage() {
    if (current_page < numPages() - 1) {
      setCurrentPage((prestate) => prestate + 1);
    }
  }

  function numPages() {
    return Math.ceil(listItems.length / per_page);

  }

  const getDynamicClass = (index: any) => {
    if (current_page === index) {
      return 'img-fade img-current';
    }
    return 'img-fade img-slide-hide'
  }

  const List = ({ item, index }: any) => {
    return (
      (<div className={`img-item ${item.id === obj.id && 'active'}`} onClick={() => setObj(item)}>
        <img data-index={index} className="imgThumbnail " src={item.src} alt="" />
      </div>)
    )
  }

  const splitEvery = (array: any, length: any) =>
    array.reduce(
      (result: any, item: any, index: any) => {
        if (index % length === 0) result.push([])
        result[Math.floor(index / length)].push(item)
        return result
      },
      []
    )

  return (
    <>
      <div className='slider-container'>
        {obj && <>
          <div className='media-container'>
            <ImageViewer
              src={obj.src}
              id={obj.id}
              // type="image"
              height="200px"
              width="100%"
            // toggleMediaStatus={() => { console.log('df') }}
            />
          </div>
        </>}
        <div id="img_slides_wrapper">
          <div id="img_slide_left" className="img_slide_arrow" onClick={() => { prevPage() }}><span>&#10094;</span></div>
          <div id="img_thumbnails" >
            {splitEvery(listItems, 3).map((items: any, inx: any) => {
              cnt++
              return (<div key={`grp-${inx}`} className={getDynamicClass(inx)} >
                {
                  items.map((item: any, index: any) => {
                    return <List key={`img-${index}`} item={item} index={index} inx={cnt} />
                  })
                }
              </div>)
            })}
          </div>
          <div id="img_slide_right" className="img_slide_arrow" onClick={() => { nextPage() }}><span>&#10095;</span></div>
        </div>
      </div>
    </>
  );
};
