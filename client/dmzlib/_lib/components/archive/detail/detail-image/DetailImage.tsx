import Image from 'next/image';
import { img_container, img, grad } from './DetailImage.css';

interface Props {
  detailImg: string;
  alt: string;
}

function DetailImage({ detailImg, alt }: Props) {
  try {
    return (
      <div className={img_container}>
        <span>뭐냐고</span>

        <Image
          src={detailImg}
          alt={alt}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className={img}
        />

        <div className={grad} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering image:', error);
    return null; // Or render a placeholder image/error message
  }
}

export default DetailImage;
