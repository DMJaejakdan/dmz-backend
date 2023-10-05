import { base } from './Nav.css';
import Txt from '../txt/Txt';

interface Props {
  text: string;
}
function Nav({ text = '지도 보기' }: Props) {
  return (
    <div className={base}>
      <Txt content={text} color="white" />
    </div>
  );
}

export default Nav;
