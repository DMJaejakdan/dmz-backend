import { PS, ContentResponse } from './api/_methods';
import Link from 'next/link';
import { NextPageContext } from 'next';

function ResultsPage({ data }: ContentResponse) {
  return (
    <div>
      {data.map((content, idx) => (
        <div key={idx}>
          <Link href={`detail/movie/${content.id}`}>{content.nameKr}</Link>
          <br />
        </div>
      ))}
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
