import { card_base } from '../Card.css';
import { Title } from '#/components/common/title/Title';
import { Chip } from '#/components/common/chip/Chip';
import { Txt } from '#/components/common/txt/Txt';
import { Spacing } from '#/components/common/spacing/Spacing';
import { default_img, drama_card, img_base } from './DramaCard.css';

interface DramaCardDataProps {
  thumbnail: string;
  title: string;
  genres: string[];
  makers: string[];
  releaseYear: number;
  episodesNum: number;
}

interface Props {
  screen?: 'pc' | 'mobile';
  dramaCardData: DramaCardDataProps;
}

export function DramaCard({ screen = 'pc', dramaCardData }: Props) {
  const { thumbnail, title, genres, makers, releaseYear, episodesNum } =
    dramaCardData;
  switch (screen) {
    case 'pc':
      return (
        <div>
          <div className={`${card_base} ${drama_card}`}>
            {/* 썸네일 */}
            <div className={img_base}>
              {thumbnail ? (
                <div>{thumbnail}</div>
              ) : (
                <div className={default_img}>이미지업슴</div>
              )}
            </div>
            {/* 텍스트 */}
            <div>
              <Title content={title} hn="h3" />
              <div>
                {genres.map((genre, idx) => (
                  <Chip key={idx} label={genre} type="suggestion" />
                ))}
              </div>
              <div>
                {/* @todo: constant로 대체 */}
                <Txt content="제작" />
                {makers.map((maker, idx) => (
                  <Txt key={idx} content={maker} />
                ))}
              </div>
              <div>
                <Txt content="연도" />
                <Txt content={releaseYear.toString()} />
              </div>
              <div>
                <Txt content="회차" />
                <Txt content={episodesNum.toString()} />
              </div>
            </div>
          </div>
        </div>
      );
    case 'mobile':
      return <div>모바일</div>;
  }
}
