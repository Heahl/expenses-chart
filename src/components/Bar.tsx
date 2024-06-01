import { useSpring, animated } from "react-spring";
import { type BalanceDataProps } from "../pages/index";
import { useState } from "react";

export type BarProps = BalanceDataProps & {
  index: number;
  highestAmount: number;
};

const Bar: React.FC<BarProps> = ({ amount, day, index, highestAmount }) => {
  const [isHovered, setIsHovered] = useState(false);

  const props = useSpring({
    height: `${amount * 5}px`,
    from: { height: "0px" },
    delay: index * 100,
  });

  //   Styles
  const barColor =
    amount === highestAmount
      ? "bg-cyan hover:bg-cyan/50"
      : "bg-soft-red hover:bg-soft-red/50";

  return (
    <div
      className="w-1/7 relative flex h-full flex-col items-center justify-end gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          style={{ bottom: `calc(${props.height.get()} + 40px)` }}
          className="absolute left-1/2 -translate-x-1/2 transform rounded-md bg-dark-brown px-2 py-1 text-very-pale-orange"
        >
          {amount}
        </div>
      )}
      <animated.div
        style={props}
        className={`w-12 rounded-md md:w-14 lg:w-16 ${barColor}`}
      />
      <div className="text-medium-brown">{day}</div>
    </div>
  );
};

export default Bar;
