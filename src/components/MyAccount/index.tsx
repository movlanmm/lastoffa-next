import { useDispatch } from "react-redux";
import { userLogout } from "@/redux/lib/userInfo";
import { hidecart } from "@/redux/lib/showCartMenu";
import { deleteAllCart } from "@/redux/lib/cartSlice";
import { deleteAllWishlist } from "@/redux/lib/wishlistSlice";
import React from "react";
import { cleanOrder } from "@/redux/lib/orderList";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const dispatch = useDispatch();
  return (
    <div className="mb-5">
      <main>
        <div className="mb-4 pb-4" />
        <section className="my-account container">
          <h2 className="page-title">My Account</h2>
          <div className="row">
            <div className="col-lg-3">
              <ul className="account-nav">
                <li>
                  <Link
                    href={"/dashboard"}
                    className={`menu-link menu-link_us-s ${pathname === "/dashboard" && "menu-link_active"
                      }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/dashboard/orders"}
                    className={`menu-link menu-link_us-s ${pathname === "/dashboard/orders" && "menu-link_active"
                      }`}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/dashboard/editAddress"}
                    className={`menu-link menu-link_us-s ${pathname === "/dashboard/editAddress" &&
                      "menu-link_active"
                      }`}
                  >
                    ADDRESSES
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/dashboard/accountEdit"}
                    className={`menu-link menu-link_us-s ${pathname === "/dashboard/accountEdit" &&
                      "menu-link_active"
                      }`}
                  >
                    Account Details
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/dashboard/wishlist"}
                    className={`menu-link menu-link_us-s ${pathname === "/dashboard/wishlist" && "menu-link_active"
                      }`}
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      dispatch(userLogout()),
                        dispatch(hidecart()),
                        dispatch(deleteAllCart()),
                        dispatch(deleteAllWishlist());
                      dispatch(cleanOrder())
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
