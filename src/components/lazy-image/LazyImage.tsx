import React, { FunctionComponent, useRef, useEffect } from "react";
import "./LazyImage.css";

export interface LazyImageProps {
  scrPreloaded: string;
  srcLoaded: string;
  alt?: string;
  className?: string;
  style?: { [x: string]: string | number };
}

const useObserveElement = (callback: () => any): IntersectionObserver => {
  const handleObserver: IntersectionObserverCallback = entities => {
    const isVisible: boolean = entities[0].isIntersecting;
    if (isVisible) {
      callback();
    }
  };

  const observer: IntersectionObserver = new IntersectionObserver(
    handleObserver,
    {
      root: null,
      rootMargin: "100px",
      threshold: 0
    }
  );

  return observer;
};

const LazyImage: FunctionComponent<LazyImageProps> = props => {
  const imgRef: React.MutableRefObject<HTMLImageElement> = useRef(new Image());

  const observer: IntersectionObserver = useObserveElement(() => {
    if (imgRef.current.getAttribute("src") !== props.srcLoaded) {
      imgRef.current.setAttribute("src", props.srcLoaded);

      imgRef.current.onload = () => {
        imgRef.current.classList.add("fade-in");
      };
    }
  });

  useEffect(() => {
    observer.observe(imgRef.current);

    return () => observer.unobserve(imgRef.current);
  }, []);

  const { scrPreloaded, alt = "", className = "", style = {} } = props;
  return (
    <div className={"image-container"}>
      <img
        className={`loaded ${className}`}
        alt={alt}
        style={style}
        ref={imgRef}
      />
      <img
        className={`preloaded ${className}`}
        src={scrPreloaded}
        alt={alt}
        style={style}
      />
    </div>
  );
};

export default LazyImage;

// const viewport = {
//     width: window.innerWidth,
//     height: window.innerHeight
//   };
// const isVisible: boolean =
//   bounding.top >= 0 &&
//   bounding.left >= 0 &&
//   bounding.right <= viewport.width &&
//   bounding.bottom <= viewport.height;
