import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type Image = {
  alt: string;
  src: string;
};

type ImageProps = {
  image: Image;
  height?: string | number;
  width: string | number;
  caption?: string;
  border_Radius?: string | number;
};

export default function LazyImage({
  image,
  height,
  width,
  caption,
  border_Radius,
}: ImageProps) {
  return (
    <div>
      <LazyLoadImage
        alt={image.alt}
        height={height}
        src={image.src}
        width={width}
        threshold={100}
        effect='blur'
        style={{ borderRadius: border_Radius ? `${border_Radius}px` : '0px' }}
      />
      {caption && <span>{caption}</span>}
    </div>
  );
}
