import { fetchPageNumbers, getPagination } from './GetPagination';
import { PhotoType } from './context/Context';

describe('test functions of paginations', () => {
  test('return fetchPageNumbers array', () => {
    const mockReturnedData = [1, 2, 3, 4, 5, 'RIGHT', 14];
    const pageNumber = fetchPageNumbers(14, 1, 1);
    expect(pageNumber).toEqual(mockReturnedData);
  });

  test('return paginated photos list', () => {
    const mockPhotoList: PhotoType[] = [
      {
        albumId: 1,
        id: 1,
        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        title: 'accusamus beatae ad facilis cum similique qui sunt',
        url: 'https://via.placeholder.com/600/92c952',
      },
      {
        albumId: 1,
        id: 2,
        thumbnailUrl: 'https://via.placeholder.com/150/771796',
        title: 'reprehenderit est deserunt velit ipsam',
        url: 'https://via.placeholder.com/600/771796',
      },
      {
        albumId: 1,
        id: 3,
        thumbnailUrl: 'https://via.placeholder.com/150/24f355',
        title: 'officia porro iure quia iusto qui ipsa ut modi',
        url: 'https://via.placeholder.com/600/24f355',
      },
      {
        albumId: 1,
        id: 4,
        thumbnailUrl: 'https://via.placeholder.com/150/d32776',
        title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
        url: 'https://via.placeholder.com/600/d32776',
      },
    ];

    const resultPhotoList: PhotoType[] = [
      {
        albumId: 1,
        id: 1,
        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        title: 'accusamus beatae ad facilis cum similique qui sunt',
        url: 'https://via.placeholder.com/600/92c952',
      },
      {
        albumId: 1,
        id: 2,
        thumbnailUrl: 'https://via.placeholder.com/150/771796',
        title: 'reprehenderit est deserunt velit ipsam',
        url: 'https://via.placeholder.com/600/771796',
      },
    ];

    const paginatedPhotoList = getPagination(1, 2, mockPhotoList);
    expect(paginatedPhotoList).toEqual(resultPhotoList);
  });
});
