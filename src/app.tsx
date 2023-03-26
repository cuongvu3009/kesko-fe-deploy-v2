import './app.css';
import { axiosInstance } from './util/axiosIntance';
import { useEffect, useState } from 'react';
import ListItem from './components/listItem/ListItem';
import Pagination from './components/pagination/Pagination';
import { IOrderDocument } from './type';
import { BsSearch } from 'react-icons/bs';
import Search from './components/search/Search';

const App = () => {
  const [ordersData, setOrdersData] = useState<IOrderDocument[] | undefined>(
    []
  );
  const [typing, setTyping] = useState<any | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orderPerPage, setOrderPerPage] = useState<number>(20);

  useEffect(() => {
    axiosInstance('/orders')
      .then((data) => setOrdersData(data.data))
      .catch((err) => console.log(err));
  }, []);

  const lastOrderIndex = currentPage * orderPerPage;
  const firstOrderIndex = lastOrderIndex - orderPerPage;
  const currentOrders = ordersData?.slice(firstOrderIndex, lastOrderIndex);

  return (
    <>
      <div className='title'>
        <Search />
        <div className='search-container'>
          <h2>Filter order by Product ID</h2>
          <div className='search-box'>
            <input
              type='text'
              placeholder='eg. 10248'
              className='search-input'
              onChange={(e: any) => setTyping(e.target.value.trim())}
            />
            <button>
              <BsSearch color='white' />
            </button>
          </div>
        </div>

        {typing?.length > 5 && (
          <h3 style={{ color: 'red' }}>Invalid product ID</h3>
        )}

        <div className='list'>
          {typing?.length === 5
            ? ordersData
                ?.filter((e) => e.OrderID == typing)
                .map((order: IOrderDocument) => {
                  return <ListItem order={order} />;
                })
            : currentOrders?.map((order: IOrderDocument) => {
                return <ListItem order={order} />;
              })}
        </div>

        <Pagination
          typing={typing}
          totalPosts={ordersData?.length}
          postsPerPage={orderPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default App;
