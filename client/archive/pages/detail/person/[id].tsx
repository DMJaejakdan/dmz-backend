import { PersonDetailResponse } from '@/response';
import detail from '@/constants/detail';
import imgSrc from '@/constants/imgSrc';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  img_container,
  img,
  grad,
  left_side,
  right_side,
} from '../../../styles/DetailPage.css';
import { NextPageContext } from 'next';

const Txt = dynamic(() => import('dmzlib/Txt'), { ssr: false });
const Title = dynamic(() => import('dmzlib/Title'), { ssr: false });
const Spacing = dynamic(() => import('dmzlib/Spacing'), { ssr: false });
const DetailImage = dynamic(() => import('dmzlib/DetailImage'), { ssr: false });
const Flex = dynamic(() => import('dmzlib/Flex'), { ssr: false });
const DetailMediaCard = dynamic(() => import('dmzlib/DetailMediaCard'), {
  ssr: false,
});

interface Props {
  personDetail: PersonDetailResponse;
}

function PersonDetailPage({ personDetail }: Props) {
  const { nameKr, profilePath, birth, death, area, simpleContentResponses } =
    personDetail;

  let gender = null;
  switch (personDetail.gender) {
    case 0:
      break;
    case 1:
      gender = '여성';
      break;
    case 2:
      gender = '남성';
      break;
    default:
  }
  const detailImgSrc = imgSrc.root + profilePath;
  return (
    <Flex justify="start" align="start">
      <div className={left_side}>
        <Txt content={area} />
        {gender ? (
          <>
            <Txt content="&nbsp;/&nbsp;" />
            <Txt content={gender ? gender : ''} />
          </>
        ) : null}
        <Title content={nameKr} hn="h3" />
        <Spacing unit="2.5" type="vertical" />

        <Title content={detail.person.birth} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        <Txt
          content={
            birth ? `${birth} ~ ${death ? death : '현재'}` : '상수(정보 없음)'
          }
        />
        <Spacing unit="2.5" type="vertical" />

        <Title content={detail.person.filmography} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        <Flex direction="row" justify="start" align="start">
          {simpleContentResponses.map((media, index) => {
            const mediaImgSrc = imgSrc.root + media.posterPath;
            return (
              <>
                <DetailMediaCard
                  key={index}
                  mediaImg={mediaImgSrc}
                  title={media.nameKr}
                />
                <Spacing unit="0.25" type="horizontal" />
              </>
            );
          })}
        </Flex>
      </div>

      <div className={`${right_side} ${img_container}`}>
        <Image
          src={detailImgSrc}
          alt={nameKr}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className={img}
        />
        <div className={grad} />
      </div>
    </Flex>
  );
}

PersonDetailPage.getInitialProps = async (context: NextPageContext) => {
  const personId = context.query.id;
  const personDetail = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT}/api/person/${personId}`
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => err);
  return { personDetail };
};

export default PersonDetailPage;
