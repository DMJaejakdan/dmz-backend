interface Props {
  type: keyof typeof ICON_TYPE;
  size: '1rem' | '2rem' | '3rem';
}

export function Icon({ type, size }: Props) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: ICON_TYPE[type] }} />
    </div>
  );
}

const ICON_TYPE = {
  search: '',
  close: '',
};
