import { MovieDetailResponse } from '@/response';
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
  movieDetail: MovieDetailResponse;
}

function MovieDetailPage({ movieDetail }: Props) {
  const {
    nameKr,
    contentActorResponses,
    contentCrewResponses,
    companies,
    keywords,
    genres,
    releasedDate,
    rating,
    boxOffice,
    posterPath,
  } = movieDetail;
  const detailImgSrc = imgSrc.root + posterPath;
  return (
    <Flex justify="start" align="start">
      <div className={left_side}>
        <Title content={nameKr} hn="h3" />
        <Spacing unit="2.5" type="vertical" />

        <Title content={detail.movie.release} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        <Txt content={releasedDate} />
        <Spacing unit="2.5" type="vertical" />

        <Title content={detail.movie.genre} hn="h4" />
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

        <Title content={detail.movie.keyword} hn="h4" />
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

        <Title content={detail.movie.makers} hn="h4" />
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

        <Title content={detail.movie.actors} hn="h4" />
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

        <Title content={detail.movie.companies} hn="h4" />
        <Spacing unit="0.5" type="vertical" />
        {companies.map((company, idx) => {
          return <Txt key={idx} content={company} />;
        })}
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

MovieDetailPage.getInitialProps = async (context: NextPageContext) => {
  const movieId = context.query.id;
  const movieDetail = await fetch(
    `http://j9a602.p.ssafy.io/api/content/movie/${movieId}`
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => err);
  return { movieDetail };
};

export default MovieDetailPage;
