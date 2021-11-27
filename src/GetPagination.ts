import { PhotoType } from "./context/Context";


export const getPagination = (curentPhoto: number, photosPerPage: number, data: PhotoType[]) => {
  const indexOfLastPhoto = curentPhoto * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotoList = data.slice(indexOfFirstPhoto, indexOfLastPhoto);
  return currentPhotoList;
}

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export const fetchPageNumbers = (totalPages: number, currentPage: number, pageNeighbours: number) => {
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    let pages: any[] = [];

    const leftBound = currentPage - pageNeighbours;
    const rightBound = currentPage + pageNeighbours;
    const beforeLastPage = totalPages - 1;
    
    const startPage = leftBound > 2 ? leftBound : 2;
    const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

    pages = range(startPage, endPage);

    const pagesCount = pages.length;
    const singleSpillOffset = totalNumbers - pagesCount - 1;

    const leftSpill = startPage > 2;
    const rightSpill = endPage < beforeLastPage;

    const leftSpillPage = "LEFT";
    const rightSpillPage = "RIGHT";

    if (leftSpill && !rightSpill) {
      const extraPages = range(startPage - singleSpillOffset, startPage - 1);
      pages = [leftSpillPage, ...extraPages, ...pages];
    } else if (!leftSpill && rightSpill) {
      const extraPages = range(endPage + 1, endPage + singleSpillOffset);
      pages = [...pages, ...extraPages, rightSpillPage];
    } else if (leftSpill && rightSpill) {
      pages = [leftSpillPage, ...pages, rightSpillPage];
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
    
};