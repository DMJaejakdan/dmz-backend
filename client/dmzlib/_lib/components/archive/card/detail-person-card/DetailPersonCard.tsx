import Txt from '#/components/common/txt/Txt';
import Image from 'next/image';
import { card_container, img_frame } from '../DetailCard.css';
import Spacing from '#/components/common/spacing/Spacing';

interface Props {
  personImg: string;
  name: string;
  fieldSection: 'maker' | 'actor';
  fields: string[];
  role?: string;
}

function DetailPersonCard({
  personImg,
  name,
  fieldSection,
  fields,
  role,
  ...props
}: Props) {
  return (
    <div
      className={card_container}
      {...props}>
      <div className={img_frame}>
        <Image
          src={personImg}
          alt={name}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <Spacing unit={0.25} />
      {fieldSection === 'actor' ? (
        <Txt
          content={`${role} 역`}
          color="disabled"
          size={14}
        />
      ) : (
        <div>
          {fields.map((field, idx) => (
            <>
              <Txt
                key={idx}
                content={field}
                color="disabled"
                size={14}
              />
              {idx < fields.length - 1 ? (
                <Txt
                  content=",&nbsp;"
                  color="disabled"
                  size={14}
                />
              ) : null}
            </>
          ))}
        </div>
      )}
      <Spacing unit={0.25} />
      <Txt content={name} />
    </div>
  );
}
export default DetailPersonCard;
