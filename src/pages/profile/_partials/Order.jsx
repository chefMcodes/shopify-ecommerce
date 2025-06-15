import { useEffect, useState, useContext } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { AuthContext } from '../../../context/AuthContext';
import { Spin } from 'antd';
import { Button } from 'antd/es/radio';
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const fetchOrders = async () => {
      const ordersRef = collection(db, `users/${currentUser.uid}/orders`);
      const querySnapshot = await getDocs(ordersRef);
      const fetchedOrders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // sort by most recent
      fetchedOrders.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

      setOrders(fetchedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) return <Spin className="block mx-auto mt-10" />;

  if (orders.length === 0) {
    return <p className="text-center mt-6">No past orders yet.</p>;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <div className="space-y-6">
        <div>
          {orders.length === 0 && (
            <p>Your order is empty! Please add to cart</p>
          )}
          {orders.map(order => (
            <div key={order.id} className="border-b border-gray-200 pb-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">
                Order placed on:{' '}
                {order.createdAt?.seconds &&
                  new Date(order.createdAt.seconds * 1000).toLocaleDateString(
                    'en-US',
                    {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
              </p>

              {order.items?.map((item, index) => (
                <div
                  key={`${order.id}-${item.id}-${index}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4"
                >
                  <div className="flex gap-4 items-start sm:items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover bg-[#f6f6f6] rounded-md"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-medium">{item.name}</p>
                      <p className="text-sm text-[#5C5F6A]">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-[#5C5F6A]">
                        Price: ${item.price}
                      </p>
                    </div>
                  </div>

                  <Button
                    className="!border-black"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    View item
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
