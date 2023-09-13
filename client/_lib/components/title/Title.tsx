import { HTMLAttributes, CSSProperties } from 'react';
import { titleAlign, titleFontSize } from './Title.css';

/**
 * @author 박성준
 */

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  content: string;
  hN: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
}

export function Title({
  content,
  hN,
  textAlign = 'start',
  // todo
  color = 'white',
}: TitleProps) {
  if (hN === 'h1')
    return (
      <h1 className={`${titleFontSize[hN]} ${titleAlign[textAlign]}`}>
        {content}
      </h1>
    );
  if (hN === 'h2')
    return (
      <h2 className={`${titleFontSize[hN]} ${titleAlign[textAlign]}`}>
        {content}
      </h2>
    );
  if (hN === 'h3')
    return (
      <h3 className={`${titleFontSize[hN]} ${titleAlign[textAlign]}`}>
        {content}
      </h3>
    );
  if (hN === 'h4')
    return (
      <h4 className={`${titleFontSize[hN]} ${titleAlign[textAlign]}`}>
        {content}
      </h4>
    );
  if (hN === 'h5')
    return (
      <h5 className={`${titleFontSize[hN]} ${titleAlign[textAlign]}`}>
        {content}
      </h5>
    );
}
