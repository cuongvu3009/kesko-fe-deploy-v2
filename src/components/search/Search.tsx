import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IProductDocument } from '../../type';
import { axiosInstance } from '../../util/axiosIntance';
import Pagination from '../pagination/Pagination';
import './search.css';

const Search = () => {
  const [products, setProducts] = useState<IProductDocument[]>([]);
  const [currentProduct, setCurrentProduct] = useState<IProductDocument[]>();
  const [show, setShow] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productPerPage, setProductPerPage] = useState<number>(20);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCopied, SetIsCopied] = useState<boolean>(false);
  const [showShip, setShowShip] = useState<boolean>(false);
  const [typing, setTyping] = useState<string>('');

  const handleProductClick = async (ProductID: number) => {
    await axiosInstance
      .get(`/orders/findbyproduct/${ProductID}`)
      .then((data) => {
        setIsOpen(true);
        setCurrentProduct(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axiosInstance('/products')
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  const lastOrderIndex = currentPage * productPerPage;
  const firstOrderIndex = lastOrderIndex - productPerPage;
  const currentProducts = products?.slice(firstOrderIndex, lastOrderIndex);

  return (
    <div className='search-container'>
      <h2>Filter order by Product</h2>
      <button style={{ marginBottom: '20px' }} onClick={() => setShow(!show)}>
        {!show ? 'Show Products' : 'Hide products'}
      </button>

      {show && (
        <div
          style={{
            backgroundColor: '#1b9086',
            padding: '20px',
            borderRadius: '15px',
          }}
        >
          <div className='list'>
            <div className='search-box'>
              <input
                type='text'
                placeholder='eg. Chai'
                className='search-input'
                onChange={(e: any) => {
                  let words = e.target.value
                    .toLowerCase()
                    .split(' ')
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(' ');

                  setTyping(words);
                }}
              />
              <button>
                <BsSearch color='white' />
              </button>
            </div>

            {currentProducts
              ?.filter((e) => e.ProductName?.includes(typing))
              .map((product: IProductDocument) => {
                return (
                  <button
                    onClick={() =>
                      handleProductClick(product.ProductID as number)
                    }
                    style={{ margin: '5px', backgroundColor: '#c43531' }}
                  >
                    {product.ProductName}
                  </button>
                );
              })}
          </div>
          <Pagination
            totalPosts={products?.length}
            postsPerPage={productPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}

      {currentProduct && isOpen && (
        <div>
          <div className='popup-container-search'>
            <div className='popup-body-search'>
              <button
                className='shipped-toggle'
                onClick={() => setShowShip(!showShip)}
              >
                {showShip ? 'Show shipped orders only' : 'Show all orders'}
              </button>

              <h3 className='copied-text'>
                {isCopied && 'Copied this text to clipboard'}
              </h3>

              {!showShip
                ? currentProduct
                    .filter((i: any) => i.OrderInfo[0].ShippedDate !== null)
                    .map((i: any) => {
                      return (
                        <div>
                          <button
                            onClick={() => {
                              SetIsCopied(true);
                              setTimeout(() => {
                                SetIsCopied(false);
                              }, 800);
                              navigator.clipboard.writeText(i.OrderID);
                            }}
                          >
                            {i.OrderID}
                          </button>
                        </div>
                      );
                    })
                : currentProduct.map((i: any) => {
                    return (
                      <div>
                        <button
                          onClick={() => {
                            SetIsCopied(true);
                            setTimeout(() => {
                              SetIsCopied(false);
                            }, 800);
                            navigator.clipboard.writeText(i.OrderID);
                          }}
                        >
                          {i.OrderID}
                        </button>
                      </div>
                    );
                  })}
              <button
                className='btn btn-search'
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
