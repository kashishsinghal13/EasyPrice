import Image from "next/image";

interface Props {
  title: string;
  iconSrc: string;
  value: string;
}

const PriceInfoCard = ({ title: cardTitle, iconSrc: icon, value: cardValue }: Props) => {
  return (
    <div className="price-info_card">
      <p className="text-base text-gray-500">{cardTitle}</p>

      <div className="flex items-center gap-2">
        <Image src={icon} alt={cardTitle} width={24} height={24} />

        <p className="text-2xl font-semibold text-secondary">{cardValue}</p>
      </div>
    </div>
  )
}

export default PriceInfoCard