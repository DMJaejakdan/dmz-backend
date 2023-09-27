import { card } from '#/constants/card';
import Image from 'next/image';
import { Title } from '#/components/common/title/Title';
import { Chip } from '#/components/common/chip/Chip';
import { Txt } from '#/components/common/txt/Txt';
import { Spacing } from '#/components/common/spacing/Spacing';
import {
  SCREEN_VARIANT,
  thumbnail_img,
  default_img,
  pc_img_container,
  mobile_img_container,
  pc_text_container,
  mobile_text_container,
  text_line,
} from '../Card.css';

interface MovieCardDataProps {
  thumbnail: string;
  title: string;
  genres: string[];
  director: string;
  releaseYear: number;
}

interface Props {
  screen?: keyof typeof SCREEN_VARIANT;
  movieCardData: MovieCardDataProps;
}

export function MovieCard({ screen = 'pc', movieCardData, ...props }: Props) {
  const { thumbnail, title, genres, director, releaseYear } = movieCardData;
  const lineSpace = 0.25;
  const txtSpace = 0.5;
  const genreSpace = 0.25;
  let imgContainer = null;
  let textContainer = null;
  switch (screen) {
    case 'pc':
      imgContainer = pc_img_container;
      textContainer = pc_text_container;
      break;
    case 'mobile':
      imgContainer = mobile_img_container;
      textContainer = mobile_text_container;
      break;
  }
  return (
    <div className={SCREEN_VARIANT[screen]} {...props}>
      <div className={imgContainer}>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title + '사진'}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className={thumbnail_img}
          />
        ) : (
          <div className={default_img} />
        )}
      </div>
      <Spacing type="vertical" />
      <div className={textContainer}>
        <Title content={title} hn="h3" />
        <Spacing unit={lineSpace} />
        <div className={text_line}>
          {genres.map((genre, idx) => (
            <div key={idx} className={text_line}>
              <Chip label={genre} type="suggestion" shape="square" />
              <Spacing type="vertical" unit={genreSpace} />
            </div>
          ))}
        </div>
        <Spacing unit={lineSpace} />
        <div className={text_line}>
          <Txt content={card.movie.label.director} color="disabled" />
          <Spacing type="vertical" unit={txtSpace} />
          <Txt content={director} />
        </div>
        <Spacing unit={lineSpace} />
        <div className={text_line}>
          <Txt content={card.movie.label.releaseYaer} color="disabled" />
          <Spacing type="vertical" unit={txtSpace} />
          <Txt content={releaseYear.toString()} />
        </div>
        <Spacing unit={lineSpace} />
      </div>
    </div>
  );
}
