import { LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  userId: number;
  loadData: (userId: number, page: number) => void;
};

const PaginationLayout: React.FC<Props> = ({ userId, loadData }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [ref, inView] = useInView({
    threshold: 0,
  });

  const loadPaginatedData = async () => {
    const el = document.querySelector('#scroll-box');
    if (el) {
      const scrollTop = el.scrollTop;
      await loadData(userId, pageNumber);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      el.scrollTo(0, scrollTop);
    }
  };

  useEffect(() => {
    if (inView) {
      loadPaginatedData();
    }
    // eslint-disable-next-line
  }, [inView]);

  return <div ref={ref}>{inView ? null : <LinearProgress />}</div>;
};

export default PaginationLayout;
