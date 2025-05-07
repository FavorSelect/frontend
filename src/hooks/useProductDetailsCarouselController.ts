import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export const useProductDetailsCarouselController = (slides: string[]) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mainViewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    loop: true,
  });

  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    axis: "y",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (embla) embla.scrollTo(index);
    },
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    const selected = embla.selectedScrollSnap();
    setSelectedIndex(selected);
    emblaThumbs.scrollTo(selected);
  }, [embla, emblaThumbs]);

  useEffect(() => {
    if (!embla || !emblaThumbs) return;
    embla.reInit();
    emblaThumbs.reInit();
    embla.scrollTo(0, true);
    emblaThumbs.scrollTo(0, true);
  }, [embla, emblaThumbs, slides]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
  }, [embla, onSelect]);

  return {
    mainViewportRef,
    thumbViewportRef,
    embla,
    emblaThumbs,
    selectedIndex,
    onThumbClick,
  };
};
