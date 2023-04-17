import React, { useState } from "react";

export default function useClassifySection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [activeValueIndex, setActiveValueIndex] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSwitch = (index) => {
    if (index == activeIndex) {
      handleClose();
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleActiveValueIndex = (index) => {
    setActiveValueIndex(index);
  };

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleSwitch,
    activeIndex,
    activeValueIndex,
    handleActiveValueIndex,
  };
}
