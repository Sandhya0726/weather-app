import Lottie from 'lottie-react';
import type { WeatherCardsProps } from '../types/WeatherCardsProps';

const WeatherCards = ({
  weekdays,
  day,
  Min,
  MinUnit,
  Max,
  MaxUnit,
  icon,
  weatherCondition,
}: WeatherCardsProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md flex flex-col gap-2 shadow-lg">
      <p className="text-lg font-poppins font-semibold !text-gray-500">
        {weekdays} <br />
        {day}
      </p>
      <p className="text-md font-poppins font-semibold !text-blue-400">
        Min: {Min}
        {MinUnit}
      </p>
      <p className="text-md font-poppins font-semibold !text-orange-600">
        Max: {Max}
        {MaxUnit}
      </p>
      <div className="flex flex-col gap-2 font-poppins font-semibold">
        {weatherCondition}
        <span className="text-[36px]">
          <Lottie
            animationData={icon}
            loop
            style={{ width: 150, height: 150 }}
          />
        </span>
      </div>
    </div>
  );
};

export default WeatherCards;
