import React, { SetStateAction } from 'react';

import './pagination.css';

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  typing,
}: any) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className='pagination'>
      {pages.map((page, index) => {
        return (
          <button
            disabled={typing}
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? 'active' : ''}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
