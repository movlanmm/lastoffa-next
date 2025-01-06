/* eslint-disable react/prop-types */
import MobileHeader from "./MobileHeader";
import Header from "./Header";
import Footer from "./Footer";
import ShoppingCart from "../ShoppingCart";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";;
import { productsSelector, getProducts, updateProduct } from '../../redux/lib/productsSlice';
import { wishlistSelector } from "../../redux/lib/wishlistSlice";
import { cartSelector } from "../../redux/lib/cartSlice";
import { userSelector } from "../../redux/lib/userInfo";
import { orderSelector } from "../../redux/lib/orderList";
import Loading from "../Loading";
import { loaded, loadingSelector, loadingStart } from "../../redux/lib/loading";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const wishlist = useAppSelector(wishlistSelector).wishlist
  const cart = useAppSelector(cartSelector).cart;
  const user = useAppSelector(userSelector)
  const products = useAppSelector(productsSelector).products
  const orders = useAppSelector(orderSelector).orders
  const loading = useAppSelector(loadingSelector).loading
  const dispatch = useAppDispatch();

  const fetchProducts = async () => {
    await getDocs(collection(db, "products")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(getProducts(newData));
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    dispatch(loadingStart())
    setTimeout(() => {
      dispatch(loaded())
    }, 2500)
  }, [])


  useEffect(() => {
    setTimeout(() => {
      products.map((product) => {
        const found = wishlist.find((item) => item.id === product.id);
        if (found) {
          dispatch(updateProduct({ ...found, added: true }));
        }
      });
    }, 1000);
  }, []);


  const updateUserWishlist = async () => {
    try {
      await updateDoc(doc(db, "users", user.userDetails.id), {
        wishlist: wishlist,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateUserOrders = async () => {
    try {
      await updateDoc(doc(db, "users", user.userDetails.id), {
        orders: orders,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateUserCart = async () => {
    try {
      await updateDoc(doc(db, "users", user.userDetails.id), {
        cart: cart,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (user.logged) {
      updateUserCart();
    }
  }, [cart]);

  useEffect(() => {
    if (user.logged) {
      updateUserWishlist();
    }
  }, [wishlist]);

  useEffect(() => {
    if (user.logged) {
      updateUserOrders();
    }
  }, [orders]);

  return (
    <>
      {loading && <Loading />}
      <MobileHeader />
      <Header />
      {children}
      <Footer />
      <ShoppingCart />
    </>
  );
}
