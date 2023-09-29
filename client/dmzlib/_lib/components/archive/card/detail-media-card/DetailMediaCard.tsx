import Txt from '#/components/common/txt/Txt';
import Image from 'next/image';
import { card_container, img_frame } from '../DetailCard.css';
import Spacing from '#/components/common/spacing/Spacing';

interface Props {
  mediaImg: string;
  title: string;
  releaseYear: number;
}

function DetailMediaCard({ mediaImg, title, releaseYear, ...props }: Props) {
  return (
    <div
      className={card_container}
      {...props}>
      <div className={img_frame}>
        <Image
          src={mediaImg}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <Spacing unit={0.25} />
      <Txt
        content={releaseYear.toString()}
        color="disabled"
        size={14}
      />
      <Spacing unit={0.25} />
      <Txt content={title} />
    </div>
  );
}
export default DetailMediaCard;
