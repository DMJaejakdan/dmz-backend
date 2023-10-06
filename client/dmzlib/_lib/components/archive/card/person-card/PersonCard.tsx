import Image from 'next/image';
import Title from '#/components/common/title/Title';
import Chip from '#/components/common/chip/Chip';
import Txt from '#/components/common/txt/Txt';
import Spacing from '#/components/common/spacing/Spacing';
import {
  thumbnail_img,
  default_img,
  pc_img_container,
  mobile_img_container,
  pc_text_container,
  mobile_text_container,
  text_line,
} from '../Card.css';
import { SCREEN_VARIANT } from './PersonCard.css';

interface PersonCardDataProps {
  thumbnail: string;
  name: string;
  sex: string;
  birthYear: string | null;
  fields: string;
}

interface Props {
  screen?: keyof typeof SCREEN_VARIANT;
  personCardData: PersonCardDataProps;
}

function PersonCard({ screen = 'pc', personCardData, ...props }: Props) {
  const { thumbnail, name, sex, birthYear, fields } = personCardData;
  const lineSpace = 0.25;
  const txtIndent = 0.25;
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
            alt={name + '사진'}
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
        <Title content={name} hn="h3" />
        <Spacing unit={lineSpace} />

        <div className={text_line}>
          <Spacing type="vertical" unit={txtIndent} />
          <Txt content={sex} color="disabled" />
          <Spacing type="vertical" unit={txtSpace} />
          {birthYear ? (
            <Txt content={birthYear.toString()} color="disabled" />
          ) : null}
        </div>
        <Spacing unit={lineSpace} />
        <div className={text_line}>
          <Chip label={fields} type="suggestion" shape="square" />
        </div>
        <Spacing unit={lineSpace} />
      </div>
    </div>
  );
}
export default PersonCard;
