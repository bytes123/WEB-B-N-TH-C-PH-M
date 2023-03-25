import React, { useState } from "react";

export default function useSearchByValue() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [activeValueIndex, setActiveValueIndex] = useState(0);

  const handleOpenSearch = () => {
    setIsOpenSearch(true);
  };

  const handleCloseSearch = () => {
    setIsOpenSearch(false);
  };

  const handleSwitchSearch = (index) => {
    if (index == activeIndex) {
      handleCloseSearch();
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleActiveValueIndex = (index) => {
    setActiveValueIndex(index);
  };

  return [
    isOpenSearch,
    handleOpenSearch,
    handleCloseSearch,
    handleSwitchSearch,
    activeIndex,
    activeValueIndex,
    handleActiveValueIndex,
  ];
}
