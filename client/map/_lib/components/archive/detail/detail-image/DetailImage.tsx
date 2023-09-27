import Image from 'next/image';
import { img_container, img, grad } from './DetailImage.css';

interface Props {
  detailImg: string;
  alt: string | null;
}

export function DetailImage({ detailImg, alt }: Props) {
  return (
    <div className={img_container}>
      {detailImg ? (
        <Image
          src={detailImg}
          alt={alt + '이미지'}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className={img}
        />
      ) : (
        <div className={img} />
      )}
      <div className={grad} />
    </div>
  );
}
