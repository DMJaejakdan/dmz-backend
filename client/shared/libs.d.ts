//테마 및 상수변수 타입 설정
declare module 'dmzlib/theme' {
  const theme: {};
  export default theme;
}
declare module 'dmzlib/card' {
  const card: {};
  export default card;
}
declare module 'dmzlib/map' {
  const map: {};
  export default map;
}
declare module 'dmzlib/searchbox' {
  const searchbox: {};
  export default searchbox;
}
declare module 'dmzlib/tabs' {
  const tabs: {};
  export default tabs;
}
//컴포넌트 타입 설정
declare module 'dmzlib/Button' {
  const Button: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    btnType?: 'button' | 'submit' | 'reset';
    color: keyof typeof COLOR_VARIANT;
    status?: keyof typeof STATUS_VARIANT;
    size?: keyof typeof SIZE_VARIANT;
    shape?: keyof typeof SHAPE_VARIANT;
    width?: keyof typeof WIDTH_VARIANT;
    onClick?: () => void | undefined;
  }
  export default Button;
}

declare module 'dmzlib/DetailMediaCard' {
  const DetailMediaCard: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props {
    mediaImg: string;
    title: string;
    releaseYear: number;
  }
  export default DetailMediaCard;
}

declare module 'dmzlib/DetailPersonCard' {
  const DetailPersonCard: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props {
    personImg: string;
    name: string;
    fieldSection: 'maker' | 'actor';
    fields: string[];
    role?: string;
  }
  export default DetailPersonCard;
}

declare module 'dmzlib/DramaCard' {
  const dramaCard: React.LazyExoticComponent<React.FC<Props>>;
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
  const MovieCard: React.LazyExoticComponent<React.FC<Props>>;
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
  const PersonCard: React.LazyExoticComponent<React.FC<Props>>;
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
  const DetailImage: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props {
    detailImg: string;
    alt: string | null;
  }
  export default DetailImage;
}

declare module 'dmzlib/Pagination' {
  const Pagination: React.LazyExoticComponent<React.FC<Props>>;
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
  const FilterBox: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props {
    title: string;
    options: string[];
    onSelect: () => void;
  }
  export default FilterBox;
}

declare module 'dmzlib/InputBox' {
  const InputBox: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props {
    title: string;
    inputId: string;
    inputName: string;
    placeholder: string;
    value?: string;
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  export default InputBox;
}

declare module 'dmzlib/KeywordBox' {
  const KeywordBox: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props {
    title: string;
    inputId: string;
    inputName: string;
    onFind: (keyword: string) => Promise<void> | null; //타입 수정해야합니다, 자동완성 ajax 요청 함수임
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  const FilterBox: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props {
    title: string;
    onFind: (keyword: string) => Promise<void> | null; //타입 수정해야합니다, 자동완성 ajax 요청 함수임
  }
  export default FilterBox;
}
declare module 'dmzlib/DateBox' {
  const DateBox: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props {
    title: string;
    placeholder?: string;
    value_f?: string;
    value_t?: string;
    inputId_f: string;
    inputName_f: string;
    inputId_t: string;
    inputName_t: string;
    onFrom: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  export default DateBox;
}
declare module 'dmzlib/Flex' {
  const Flex: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props {
    direction: keyof typeof DIRECTION_VARIANT;
    justify: keyof typeof JUSTIFY_VARIANT;
    align: keyof typeof ALIGN_VARIANT;
    children: ReactNode;
  }
  export default Flex;
}
declare module 'dmzlib/Chip' {
  const Chip: React.LazyExoticComponent<React.FC<Props>>;
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
  const Icon: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    type: keyof typeof ICON_TYPE;
    color: keyof typeof COLOR_VARIANT;
  }
  export default Icon;
}

declare module 'dmzlib/Input' {
  const Input: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props extends HTMLAttributes<HTMLInputElement> {
    placeholder: string;
    inputId?: string;
    inputName?: string;
    value?: string;
    onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  export default Input;
}

declare module 'dmzlib/Spacing' {
  const Spacing: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props {
    type?: 'horizontal' | 'vertical';
    unit?: keyof typeof HORIZONTAL_VARIANT;
  }
  export default Spacing;
}

declare module 'dmzlib/Title' {
  const Title: React.LazyExoticComponent<React.FC<Props>>;
  export interface Props extends HTMLAttributes<HTMLHeadingElement> {
    content: string;
    hn: keyof typeof SIZE_VARIANT;
    align?: keyof typeof ALIGN_VARIANT;
    color?: keyof typeof COLOR_VARIANT;
  }
  export default Title;
}

declare module 'dmzlib/Txt' {
  const Txt: React.LazyExoticComponent<React.FC<Props>>;
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
