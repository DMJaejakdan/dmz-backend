import Txt from '#/components/common/txt/Txt';
import Image from 'next/image';
import { card_container, img_frame, txt_frame } from '../DetailCard.css';
import Spacing from '#/components/common/spacing/Spacing';

interface Props {
  mediaImg: string;
  title: string;
}

function DetailMediaCard({ mediaImg, title, ...props }: Props) {
  return (
    <div className={card_container} {...props}>
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
      <div className={txt_frame}>
        <Txt content={title} align="center" />
      </div>
    </div>
  );
}
export default DetailMediaCard;
