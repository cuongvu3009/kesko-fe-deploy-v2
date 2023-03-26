import { useEffect, useState } from 'react';
import { IOrderData, IOrderDetailst, IOrderDocument } from '../../type';
import { axiosInstance } from '../../util/axiosIntance';
import './listItem.css';

const ListItem = ({ order }: IOrderData) => {
  const [currentOrder, setCurrentOrder] = useState<IOrderDocument>();
  const [orderDetails, setOrderDetails] = useState<IOrderDetailst[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (order: any) => {
    setCurrentOrder(order.OrderID);
    setIsOpen(true);
  };

  if (currentOrder) {
    useEffect(() => {
      axiosInstance(`/orders/findbyid/${currentOrder}`)
        .then((data) => setOrderDetails(data.data))
        .catch((err) => console.log(err));
    }, [currentOrder]);
  }

  return (
    <>
      {/* popup to show single order info */}
      {orderDetails && isOpen && (
        <div className='popup-container'>
          <div className='popup-body'>
            <h2 style={{ color: 'green' }}>Products List</h2>
            {orderDetails.map((i: any) => {
              return (
                <div>
                  <h5>
                    #ID {i.ProductID}: {i.ProductInfo[0].ProductName} (
                    {i.Quantity}
                    kpl *{i.UnitPrice}€) - Discount: {i.Discount * 100}%
                  </h5>
                </div>
              );
            })}

            <button className='btn' onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className='listItem-container'>
        <div className='listItem-info'>
          <div className='info'>
            <label htmlFor='' className='info-label'>
              OrderID
            </label>
            <h3 className='info-text'>{order.OrderID}</h3>
          </div>

          <div className='info'>
            <label htmlFor='' className='info-label mobile-hide'>
              Ship address
            </label>
            <h3 className='info-text mobile-hide'>
              {order.ShipAddress}, {order.ShipPostalCode}, {order.ShipCity},{' '}
              {order.ShipCountry}
            </h3>
          </div>

          <div className='info'>
            <label htmlFor='' className='info-label'>
              Customer name
            </label>
            <h3 className='info-text'>{order.CustomerInfo![0].ContactName}</h3>
          </div>

          <div className='info'>
            <label htmlFor='' className='info-label mobile-hide'>
              Order date
            </label>
            <h3 className='info-text mobile-hide'>{order.OrderDate}</h3>
          </div>

          <div className='info'>
            <label htmlFor='' className='info-label mobile-hide'>
              Status
            </label>
            <h4 className='info-text mobile-hide'>
              {order.ShippedDate
                ? `Shipped on ${order.ShippedDate}`
                : 'Not shipped'}
            </h4>
          </div>
        </div>
        <button className='detail-btn' onClick={() => handleClick(order)}>
          View Details
        </button>
      </div>
    </>
  );
};

export default ListItem;
