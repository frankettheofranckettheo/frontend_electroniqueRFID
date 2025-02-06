import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  pageItems: number[];
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  getItemsForPage: <T>(items: T[]) => T[];
}

export function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageItems = useMemo(() => {
    const items: number[] = [];
    const maxPages = 5;
    const halfMaxPages = Math.floor(maxPages / 2);

    let startPage = Math.max(currentPage - halfMaxPages, 1);
    const endPage = Math.min(startPage + maxPages - 1, totalPages);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(endPage - maxPages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    return items;
  }, [currentPage, totalPages]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getItemsForPage = <T>(items: T[]): T[] => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  };

  return {
    currentPage,
    totalPages,
    pageItems,
    setCurrentPage,
    nextPage,
    prevPage,
    getItemsForPage,
  };
}
