import { Txt } from '#/components/common/txt/Txt';
import Image from 'next/image';
import { card_container, img } from '../DetailCard.css';
import { Spacing } from '#/components/common/spacing/Spacing';

interface Props {
  mediaImg: string;
  title: string;
  releaseYear: number;
}

export function DetailMediaCard({
  mediaImg,
  title,
  releaseYear,
  ...props
}: Props) {
  return (
    <div className={card_container} {...props}>
      <Image
        src={mediaImg}
        alt={title}
        width={100}
        height={150}
        objectFit="cover"
        objectPosition="center"
        className={img}
      />
      <Spacing unit={0.25} />
      <Txt content={releaseYear.toString()} color="disabled" size={14} />
      <Spacing unit={0.25} />
      <Txt content={title} />
    </div>
  );
}
