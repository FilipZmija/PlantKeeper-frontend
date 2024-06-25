import React, { useEffect, useRef, useState } from "react";

export interface ICarouselProps {
  components: (() => JSX.Element)[];
  size: "xsmall" | "small" | "medium" | "large";
  showButtons?: boolean;
}

interface IButtonProps {
  onClick: () => void;
  size: "xsmall" | "small" | "medium" | "large";
  prev: boolean;
}

const Carousel = ({ components, size, showButtons = true }: ICarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showComponentIndex, setShowComponentIndex] = useState<number | null>(
    null
  );
  const [isMouseOver, setIsMouseOver] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refCurrent = ref.current;
    refCurrent?.addEventListener("mouseenter", (e) => {
      const { title } = e.target as HTMLElement;
      if (title === "now-displayed" && !isAnimating) {
        setIsMouseOver(true);
      }
    });
    refCurrent?.addEventListener("mouseleave", (e) => {
      const { title } = e.target as HTMLElement;
      if (title === "now-displayed" && !isAnimating) {
        setIsMouseOver(false);
      }
    });
    return () => {
      refCurrent?.removeEventListener("mouseenter", () => {
        setIsMouseOver(false);
      });
      refCurrent?.removeEventListener("mouseleave", () => {
        setIsMouseOver(false);
      });
    };
  }, [showComponentIndex, isAnimating]);

  useEffect(() => {
    setIsAnimating(true);
    const timeoutId = setTimeout(() => {
      setShowComponentIndex(currentIndex);
    }, 10);
    const timeoutStop = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => {
      clearTimeout(timeoutStop);
      clearTimeout(timeoutId);
    };
  }, [currentIndex]);

  const Button = ({ onClick, size, prev }: IButtonProps) => {
    const getSizeClass = () => {
      switch (size) {
        case "xsmall":
          return "w-6 h-6";
        case "small":
          return "w-8 h-8";
        case "medium":
          return "w-10 h-10";
        case "large":
          return "w-12 h-12";
        default:
          return "w-10 h-10";
      }
    };

    return (
      <button
        onClick={onClick}
        type="button"
        className={`inline-flex items-center justify-center rounded-full bg-dark-green/40 hover:bg-text-green/50 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none ${getSizeClass()} focus:outline-none`}
      >
        {prev ? (
          <>
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </>
        )}
      </button>
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? components.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === components.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className={`${
        isMouseOver && !isAnimating ? "overflow-visible" : "overflow-hidden"
      } relative w-full max32-w-xl mx-auto bg-inherit`}
    >
      <div
        className={`flex transition-transform duration-500 ease-in-out`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {components.map((Component, index) => (
          <div
            key={index}
            className={`${
              isAnimating || index === showComponentIndex
                ? "opacity-100"
                : "opacity-0"
            } w-full flex-shrink-0`}
          >
            <div
              className={`flex flex-col h-full flex-nowrap justify-between content-between min-h-24`}
              title={`${
                index === showComponentIndex ? "now-displayed" : "hidden"
              }`}
              ref={ref}
            >
              <Component />
            </div>
          </div>
        ))}
      </div>
      <div
        className={`${
          !showButtons ? "hidden" : "flex"
        } absolute top-0 left-0 z-30 items-center justify-center h-full px-4 cursor-pointer group focus:outline-none opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out`}
        data-carousel-prev
      >
        <Button onClick={prevSlide} size={size} prev={true} />
      </div>
      <div
        className={`${
          !showButtons ? "hidden" : "flex"
        } absolute top-0 right-0 z-30 items-center justify-center h-full px-4 cursor-pointer group focus:outline-none opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out`}
        data-carousel-next
      >
        <Button onClick={nextSlide} size={size} prev={false} />
      </div>
      <div className="left-0 right-0 bottom-0 flex justify-center">
        {components.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
