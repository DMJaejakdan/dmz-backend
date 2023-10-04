declare module 'dmzlib/Button' {
  const Button: React.ComponentType<Props>;
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    btnType?: 'button' | 'submit' | 'reset';
    color: keyof typeof COLOR_VARIANT;
    status?: keyof typeof STATUS_VARIANT;
    size?: keyof typeof SIZE_VARIANT;
    shape?: keyof typeof SHAPE_VARIANT;
    width?: keyof typeof WIDTH_VARIANT;
  }
  export default Button;
}

declare module 'dmzlib/DetailMediaCard' {
  const DetailMediaCard: React.ComponentType<Props>;
  export interface Props {
    mediaImg: string;
    title: string;
    releaseYear: number;
  }
  export default DetailMediaCard;
}

declare module 'dmzlib/DetailPersonCard' {
  const DetailPersonCard: React.ComponentProps<Props>;
  export interface Props {
    personImg: string;
    name: string;
    fieldSection: 'maker' | 'actor';
    fields: string[];
    role?: string;
  }
  export default DetailPersonCard;
}

declare module 'dmzlib/dramaCard' {
  const dramaCard: React.ComponentProps<Props>;
  export interface DramaCardDataProps {
    thumbnail: string;
    title: string;
    genres: string[];
    makers: string[];
    releaseYear: number;
    episodesNum: number;
  }
  export default dramaCard;
}

declare module 'dmzlib/MovieCard' {
  const MovieCard: React.ComponentProps<Props>;
  export interface MovieCardDataProps {
    thumbnail: string;
    title: string;
    genres: string[];
    director: string;
    releaseYear: number;
  }
  export default MovieCard;
}

declare module 'dmzlib/PersonCard' {
  const PersonCard: React.ComponentProps<Props>;
  export interface Props {
    thumbnail: string;
    name: string;
    sex: string;
    birthYear: number | null;
    fields: string[];
  }
  export default PersonCard;
}

declare module 'dmzlib/DetailImage' {
  const DetailImage: React.ComponentProps<Props>;
  export interface Props {
    detailImg: string;
    alt: string | null;
  }
  export default DetailImage;
}

declare module 'dmzlib/Pagination' {
  const Pagination: React.ComponentProps<Props>;
  export interface Props {
    max: number;
    currPage: number;
    shownNums?: 3 | 5 | 7;
    onPageChange: (pageNum: number) => void;
    onPageMoveLeft: (pageNum: number) => void;
    onPageMoveRight: (pageNum: number) => void;
  }
  export default Pagination;
}

declare module 'dmzlib/FilterBox' {
  const FilterBox: React.ComponentProps<Props>;
  export interface Props {
    title: string;
    options: string[];
    onSelect: () => void;
  }
  export default FilterBox;
}

declare module 'dmzlib/InputBox' {
  const InputBox: React.ComponentProps<Props>;
  export interface Props {
    title: string;
    placeholder: string;
    value?: string;
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  export default InputBox;
}

declare module 'dmzlib/KeywordBox' {
  const KeywordBox: React.ComponentProps<Props>;
  export interface Props {
    title: string;
    onFind: (keyword: string) => Promise<void> | null; //타입 수정해야합니다, 자동완성 ajax 요청 함수임
  }
  export default KeywordBox;
}

declare module 'dmzlib/Tabs' {
  const Tabs: React.ComponentProps<TabsProps>;
  interface TabContent {
    title: string;
    children: ReactNode;
  }

  interface TabsProps {
    TabContents: TabContent[];
  }

  interface TabProps {
    title: string;
    active: keyof typeof TAB_ACTIVE_VARIANT;
    onTabChange: () => void;
  }
  export default Tabs;
}

declare module 'dmzlib/KeywordBox' {
  const FilterBox: React.ComponentProps<Props>;
  export interface Props {
    title: string;
    onFind: (keyword: string) => Promise<void> | null; //타입 수정해야합니다, 자동완성 ajax 요청 함수임
  }
  export default FilterBox;
}

declare module 'dmzlib/Chip' {
  const Chip: React.ComponentProps<Props>;
  export interface Props {
    type: keyof typeof TYPE_VARIANT;
    label: string;
    shape?: keyof typeof SHAPE_VARIANT;
    onSelect?: (label: string) => void;
    onDelete?: (kwd: string) => void;
  }
  export default Chip;
}

declare module 'dmzlib/Icon' {
  const Icon: React.ComponentProps<Props>;
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    type: keyof typeof ICON_TYPE;
    color: keyof typeof COLOR_VARIANT;
  }
  export default Icon;
}

declare module 'dmzlib/Input' {
  const Input: React.ComponentProps<Props>;
  export interface Props extends HTMLAttributes<HTMLInputElement> {
    placeholder: string;
    value?: string;
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  export default Input;
}

declare module 'dmzlib/Spacing' {
  const Spacing: React.ComponentProps<Props>;
  export interface Props {
    type?: 'horizontal' | 'vertical';
    unit?: keyof typeof HORIZONTAL_VARIANT;
  }
  export default Spacing;
}

declare module 'dmzlib/Title' {
  const Title: React.ComponentProps<Props>;
  export interface Props extends HTMLAttributes<HTMLHeadingElement> {
    content: string;
    hn: keyof typeof SIZE_VARIANT;
    align?: keyof typeof ALIGN_VARIANT;
    color?: keyof typeof COLOR_VARIANT;
  }
  export default Title;
}

declare module 'dmzlib/Txt' {
  const Txt: React.ComponentProps<Props>;
  export interface Props {
    content: string;
    type?: 'span' | 'p';
    size?: keyof typeof SIZE_VARIANT;
    weight?: keyof typeof WEIGHT_VARIANT;
    align?: keyof typeof ALIGN_VARIANT;
    color?: keyof typeof COLOR_VARIANT;
  }
  export default Txt;
}
