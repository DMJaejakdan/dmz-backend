import { PS, PersonResponse } from './api/_methods';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import imgSrc from '@/constants/imgSrc';
import { result_list } from '@/styles/ResultPage.css';
import { NextPageContext } from 'next';

const PersonCard = dynamic(() => import('dmzlib/PersonCard'), { ssr: false });
const Pagination = dynamic(() => import('dmzlib/Pagination'), { ssr: false });

function ResultsPage({ data }: PersonResponse) {
  return (
    <div className={result_list}>
      {data.map((person, idx) => {
        const { nameKr, profilePath, birth, death, area } = person;
        const src = imgSrc.root + profilePath;
        let gender = '';
        switch (person.gender) {
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
        return (
          <div key={idx}>
            <Link href={`/detail/person/${person.id}`}>
              <PersonCard
                name={nameKr}
                sex={gender}
                birthYear={birth}
                fields={area}
                thumbnail={src}
              />
            </Link>
            <br />
          </div>
        );
      })}
      {/* <Pagination /> */}
    </div>
  );
}

ResultsPage.getInitialProps = async (context: NextPageContext) => {
  const queries = context.query; // URL의 쿼리 파라미터 접근
  const res = await PS(queries);
  if (res) return res;
  else return { data: [] };
};
export default ResultsPage;
