import { LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const { loading } = useSelector((state: ReduxStore) => ({
    loading: state.common.todoLoading,
  }));

  const loadPaginatedData = async () => {
    if (loading) {
      return;
    }
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
