import Image from 'next/image';
import { Title } from '#/components/common/title/Title';
import { Chip } from '#/components/common/chip/Chip';
import { Txt } from '#/components/common/txt/Txt';
import { Spacing } from '#/components/common/spacing/Spacing';
import {
  text_container,
  text_line,
  default_img,
  img_container,
} from '../Card.css';
import { person_card_base } from './PersonCard.css';

/**
 * @todo 라벨들 constant로 설정
 */

interface PersonCardDataProps {
  thumbnail: string;
  name: string;
  sex: string;
  birthYear: number | null;
  fields: string[];
}

interface Props {
  screen?: 'pc' | 'mobile';
  personCardData: PersonCardDataProps;
}

export function PersonCard({ screen = 'pc', personCardData }: Props) {
  const { thumbnail, name, sex, birthYear, fields } = personCardData;
  const lineSpace = 0.25;
  const txtIndent = 0.25;
  const txtSpace = 0.5;
  const genreSpace = 0.25;
  switch (screen) {
    case 'pc':
      return (
        <div className={person_card_base}>
          {/* 썸네일 정보 */}
          <div className={img_container}>
            {thumbnail ? (
              <Image src={thumbnail} alt={name + '사진'} layout="fill" />
            ) : (
              <div className={default_img}>이미지업슴</div>
            )}
          </div>
          <Spacing type="vertical" />
          {/* 텍스트 정보 */}
          <div className={text_container}>
            {/* 제목 */}
            <Title content={name} hn="h3" />
            <Spacing unit={lineSpace} />

            {/* 성별, 생년 */}
            <div className={text_line}>
              {/* @todo: constant로 대체 */}
              <Spacing type="vertical" unit={txtIndent} />
              <Txt content={sex} color="disabled" />
              <Spacing type="vertical" unit={txtSpace} />
              {birthYear ? (
                <Txt content={birthYear.toString()} color="disabled" />
              ) : null}
            </div>
            <Spacing unit={lineSpace} />
            {/* 분야: @todo - wrap되면 line height가 없음 */}
            <div className={text_line}>
              {fields.map((genre, idx) => (
                <div key={idx} className={text_line}>
                  <Chip label={genre} type="suggestion" shape="square" />
                  <Spacing type="vertical" unit={genreSpace} />
                </div>
              ))}
            </div>
            <Spacing unit={lineSpace} />
          </div>
        </div>
      );
    case 'mobile':
      return <div>모바일</div>;
  }
}
