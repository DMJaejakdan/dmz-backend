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

/**
 * @todo 이미지 없을 때 기본이미지
 */

interface DramaCardDataProps {
  thumbnail: string;
  title: string;
  genres: string[];
  makers: string[];
  releaseYear: number;
  episodesNum: number;
}

interface Props {
  screen?: keyof typeof SCREEN_VARIANT;
  dramaCardData: DramaCardDataProps;
}

export function DramaCard({ screen = 'pc', dramaCardData, ...props }: Props) {
  const { thumbnail, title, genres, makers, releaseYear, episodesNum } =
    dramaCardData;
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
      {/* 썸네일 정보 */}
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
      {screen === 'pc' ? <Spacing type="vertical" /> : null}
      {/* 텍스트 정보 */}
      <div className={textContainer}>
        {/* 제목 */}
        <Title content={title} hn="h3" />
        <Spacing unit={lineSpace} />
        {/* 장르 */}
        <div className={text_line}>
          {genres.map((genre, idx) => (
            <div key={idx} className={text_line}>
              <Chip label={genre} type="suggestion" shape="square" />
              <Spacing type="vertical" unit={genreSpace} />
            </div>
          ))}
        </div>
        <Spacing unit={lineSpace} />
        {/* 제작 */}
        <div className={text_line}>
          <Txt content={card.drama.label.maker} color="disabled" />
          <Spacing type="vertical" unit={txtSpace} />
          {makers.map((maker, idx) => (
            <div key={idx} className={text_line}>
              <Txt content={maker} />
              {idx < makers.length - 1 ? <Txt content=",&nbsp;" /> : null}
            </div>
          ))}
        </div>
        <Spacing unit={lineSpace} />
        {/* 연도 */}
        <div className={text_line}>
          <Txt content={card.drama.label.releaseYear} color="disabled" />
          <Spacing type="vertical" unit={txtSpace} />
          <Txt content={releaseYear.toString()} />
        </div>
        <Spacing unit={lineSpace} />
        {/* 회차 */}
        <div className={text_line}>
          <Txt content={card.drama.label.episodeNum} color="disabled" />
          <Spacing type="vertical" unit={txtSpace} />
          <Txt content={episodesNum.toString()} />
        </div>
      </div>
    </div>
  );
}
