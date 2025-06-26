import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

const MenuPage = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      const snapshot = await getDocs(collection(db, 'menu'));
      setMenu(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }

    fetchMenu();
  }, []);

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {menu.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> - R{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPage;
