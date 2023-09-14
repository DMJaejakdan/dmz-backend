/**
 * @author 박성준
 * @todo color를 글로벌스타일의 white로 변경 / 컬러 variant가 엄청 많을까? 사용자 지정으로 받을 정도로?
 * @todo size도
 */

interface TxtProps {
  content: string;
  variant?: 'span' | 'p';
  fontSize?: string;
  textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
  // todo
  color?: 'white' | string;
}

export function Txt({
  content,
  variant = 'span',
  textAlign = 'start',
  // todo
  color = 'white',
}: TxtProps) {
  if (variant === 'span') return <span>{content}</span>;
  if (variant === 'p') return <p>{content}</p>;
}
