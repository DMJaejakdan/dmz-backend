import { CS, ContentResponse } from './api/_methods';
import dynamic from 'next/dynamic';
import imgSrc from '@/constants/imgSrc';
import Link from 'next/link';
import { result_list } from '@/styles/ResultPage.css';
import { NextPageContext } from 'next';

const MovieCard = dynamic(() => import('dmzlib/MovieCard'), { ssr: false });
const DramaCard = dynamic(() => import('dmzlib/DramaCard'), { ssr: false });
const Pagination = dynamic(() => import('dmzlib/Pagination'), { ssr: false });

function ResultsPage({ data }: ContentResponse) {
  return (
    <div className={result_list}>
      {data.map((content, idx) => {
        const {
          nameKr,
          nameEn,
          kind,
          posterPath,
          releasedDate,
          genreResponseList,
          movieInfoResponse,
          dramaInfoResponse,
        } = content;
        const thumbnail = imgSrc.root + posterPath;
        const title = nameKr;
        const genres = genreResponseList.map(genre => genre.name);
        const releaseYear = releasedDate ? releasedDate : 0;
        const makers: string[] = [];
        const director: string = '';
        const episodesNum: number = 0;
        switch (kind) {
          case 'DRAMA':
            const dramaCardData = {
              thumbnail,
              title,
              genres,
              makers,
              releaseYear,
              episodesNum,
            };
            return (
              <div key={idx}>
                <Link href={`/dmzarchive/detail/drama/${content.id}`}>
                  <DramaCard dramaCardData={dramaCardData} />
                </Link>
                <br />
              </div>
            );
          case 'MOVIE':
            const movieCardData = {
              thumbnail,
              title,
              genres,
              director,
              releaseYear,
            };
            return (
              <div key={idx}>
                <Link href={`/dmzarchive/detail/movie/${content.id}`}>
                  <MovieCard movieCardData={movieCardData} />
                </Link>
                <br />
              </div>
            );
        }
      })}
      {/* <Pagination /> */}
    </div>
  );
}

ResultsPage.getInitialProps = async (context: NextPageContext) => {
  const queries = context.query; // URL의 쿼리 파라미터 접근
  const res = await CS(queries);
  if (res) {
    return res;
  } else {
    return { data: [] };
  }
};
export default ResultsPage;
