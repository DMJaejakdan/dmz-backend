import Image from 'next/image';
import { Title } from '#/components/common/title/Title';
import { Chip } from '#/components/common/chip/Chip';
import { Txt } from '#/components/common/txt/Txt';
import { Spacing } from '#/components/common/spacing/Spacing';
import {
  media_card_base,
  text_container,
  text_line,
  default_img,
  img_container,
} from '../Card.css';

/**
 * @todo 라벨들 constant로 설정
 */

interface MovieCardDataProps {
  thumbnail: string;
  title: string;
  genres: string[];
  director: string;
  releaseYear: number;
}

interface Props {
  screen?: 'pc' | 'mobile';
  movieCardData: MovieCardDataProps;
}

export function MovieCard({ screen = 'pc', movieCardData }: Props) {
  const { thumbnail, title, genres, director, releaseYear } = movieCardData;
  const lineSpace = 0.25;
  const txtSpace = 0.5;
  const genreSpace = 0.25;
  switch (screen) {
    case 'pc':
      return (
        <div className={media_card_base}>
          {/* 썸네일 정보 */}
          <div className={img_container}>
            {thumbnail ? (
              <Image src={thumbnail} alt={title + '사진'} layout="fill" />
            ) : (
              <div className={default_img}>이미지업슴</div>
            )}
          </div>
          <Spacing type="vertical" />
          {/* 텍스트 정보 */}
          <div className={text_container}>
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
              {/* @todo: constant로 대체 */}
              <Txt content="감독" color="disabled" />
              <Spacing type="vertical" unit={txtSpace} />
              <Txt content={director} />
            </div>
            <Spacing unit={lineSpace} />
            {/* 연도 */}
            <div className={text_line}>
              <Txt content="연도" color="disabled" />
              <Spacing type="vertical" unit={txtSpace} />
              <Txt content={releaseYear.toString()} />
            </div>
            <Spacing unit={lineSpace} />
          </div>
        </div>
      );
    case 'mobile':
      return <div>모바일</div>;
  }
}
