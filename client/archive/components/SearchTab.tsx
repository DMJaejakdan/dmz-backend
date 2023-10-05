import dynamic from 'next/dynamic';
import DSearch from './dramaSearch/DSearch';
import MSearch from './movieSearch/MSearch';
import PSearch from './personSearch/PSearch';
import { base } from './SearchTab.css';

const Tabs = dynamic(() => import('dmzlib/Tabs'), { ssr: false });
function SearchTab() {
  const TAB_CONTENTS = [
    {
      title: '드라마',
      children: <DSearch />,
    },
    {
      title: '영화',
      children: <MSearch />,
    },
    {
      title: '인물',
      children: <PSearch />,
    },
  ];
  return (
    <div className={base}>
      <Tabs TabContents={TAB_CONTENTS} />
    </div>
  );
}

export default SearchTab;
