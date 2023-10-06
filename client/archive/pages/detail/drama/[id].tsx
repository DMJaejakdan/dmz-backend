import { DramaDetailResponse } from '@/response';
import dynamic from 'next/dynamic';
import imgSrc from '@/constants/imgSrc';
import detail from '@/constants/detail';
import { NextPageContext } from 'next';
import Image from 'next/image';
import {
  img_container,
  img,
  grad,
  left_side,
  right_side,
} from '../../../styles/DetailPage.css';

const Txt = dynamic(() => import('dmzlib/Txt'), { ssr: false });
const Title = dynamic(() => import('dmzlib/Title'), { ssr: false });
const Chip = dynamic(() => import('dmzlib/Chip'), { ssr: false });
const Spacing = dynamic(() => import('dmzlib/Spacing'), { ssr: false });
const DetailImage = dynamic(() => import('dmzlib/DetailImage'), { ssr: false });
const Flex = dynamic(() => import('dmzlib/Flex'), { ssr: false });
const DetailPersonCard = dynamic(() => import('dmzlib/DetailPersonCard'), {
  ssr: false,
});

interface Props {
  dramaDetail: DramaDetailResponse;
}

function DramaDetailPage({ dramaDetail }: Props) {
  const {
    nameKr,
    contentActorResponses,
    contentCrewResponses,
    companies,
    keywords,
    genres,
    channel,
    releasedDate,
    endDate,
    rating,
    posterPath,
    episodeResponses,
  } = dramaDetail;
  const detailImgSrc = imgSrc.root + posterPath;
  return (
    <Flex justify="start" align="start">
      <div className={left_side}>
        <Title content={nameKr} hn="h3" />
        <Spacing unit="2.5" type="vertical" />

        <Title content={detail.drama.release} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        <Flex direction="column" justify="start" align="start">
          <Flex direction="row" justify="start" align="start">
            <Txt content={detail.drama.startDate} color="disabled" />
            <Txt content="&nbsp;" />
            <Txt content={releasedDate} />
          </Flex>
          <Flex direction="row" justify="start" align="start">
            <Txt content={detail.drama.endDate} color="disabled" />
            <Txt content="&nbsp;" />
            <Txt content={endDate} />
          </Flex>
        </Flex>
        <Spacing unit="2.5" type="vertical" />

        <Title content={detail.drama.genre} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        <Flex direction="row" justify="start" align="start" wrap="wrap">
          {genres.map((genre, idx) => {
            return (
              <>
                <Chip key={idx} label={genre} type="suggestion" />
                <Spacing unit="0.25" type="horizontal" />
              </>
            );
          })}
        </Flex>
        <Spacing unit="2.5" type="vertical" />

        <Title content={detail.drama.keyword} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        <Flex direction="row" justify="start" align="start" wrap="wrap">
          {keywords.map((keyword, idx) => {
            return (
              <>
                <Chip key={idx} label={keyword} type="suggestion" />
                <Spacing unit="0.25" type="horizontal" />
              </>
            );
          })}
        </Flex>
        <Spacing unit="2.5" type="vertical" />

        <Title content={detail.drama.makers} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        <Flex direction="row" justify="start" align="start" wrap="wrap">
          {contentCrewResponses.map((crew, idx) => {
            const src = imgSrc.root + crew.profilePath;
            return (
              <>
                <DetailPersonCard
                  key={idx}
                  fieldSection="maker"
                  personImg={src}
                  name={crew.nameKr}
                  fields={crew.role}
                />
                <Spacing unit="0.25" type="horizontal" />
              </>
            );
          })}
        </Flex>

        <Title content={detail.drama.actors} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        <Flex direction="row" justify="start" align="start" wrap="wrap">
          {contentActorResponses.map((actor, idx) => {
            const src = imgSrc.root + actor.profilePath;
            return (
              <>
                <DetailPersonCard
                  key={idx}
                  fieldSection="actor"
                  personImg={src}
                  name={actor.nameKr}
                  role={actor.role}
                />
                <Spacing unit="0.25" type="horizontal" />
              </>
            );
          })}
        </Flex>

        <Title content={detail.drama.companies} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        {companies.map((company, idx) => {
          return <Txt key={idx} content={company} />;
        })}
        <Spacing unit="2.5" type="vertical" />

        <Title content={detail.drama.channel} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        <Txt content={channel} />
        <Spacing unit="2.5" type="vertical" />
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

DramaDetailPage.getInitialProps = async (context: NextPageContext) => {
  const dramaId = context.query.id;
  const dramaDetail = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT}/api/content/drama/${dramaId}`
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => err);
  return { dramaDetail };
};

export default DramaDetailPage;
