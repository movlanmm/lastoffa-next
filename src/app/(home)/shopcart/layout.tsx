'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ShoppingCartLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    return (
        <>
            <main>
                <div className="mb-4 pb-4" />
                <section className="shop-checkout container">
                    <h2 className="page-title">
                        {pathname === "/shopcart"
                            ? "Cart"
                            : pathname === "/shopcart/checkout"
                                ? "Shipping and Checkhout"
                                : "Confirmation"}
                    </h2>
                    <div className="checkout-steps">
                        <Link className="checkout-steps__item active" href={"/shopcart"}>
                            <span className="checkout-steps__item-number">01</span>
                            <span className="checkout-steps__item-title">
                                <span>Shopping Bag</span>
                                <em>Manage Your Items List</em>
                            </span>
                        </Link>
                        <a
                            className={`checkout-steps__item ${(pathname === "/shopcart/checkout" ||
                                pathname.includes("/shopcart/confirmation")) &&
                                "active"
                                } `}
                        >
                            <span className="checkout-steps__item-number">02</span>
                            <span className="checkout-steps__item-title">
                                <span>Shipping and Checkout</span>
                                <em>Checkout Your Items List</em>
                            </span>
                        </a>
                        <a
                            className={`checkout-steps__item ${pathname.includes("/shopcart/confirmation") && "active"
                                } `}
                        >
                            <span className="checkout-steps__item-number">03</span>
                            <span className="checkout-steps__item-title">
                                <span>Confirmation</span>
                                <em>Review And Submit Your Order</em>
                            </span>
                        </a>
                    </div>
                    {children}
                </section>
            </main>
            <div className="mb-5 pb-xl-5"></div>
        </>
    );
}
