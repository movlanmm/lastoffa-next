'use client'
import { FaHeart } from "react-icons/fa";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { HiOutlineXMark } from "react-icons/hi2";
import { removeFromWishlist } from "@/redux/lib/wishlistSlice";
import { SingleProduct } from "@/types";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";

export default function WishlistItem({ product }: SingleProduct) {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="product-card-wrapper">
      <div className="product-card mb-3 mb-md-4 mb-xxl-5">
        <div className="pc__img-wrapper">
          <Swiper
            id={new Date().getTime().toString()}
            className={`swiper-wrapper mySwipper-${new Date()
              .getTime()
              .toString()}`}
            loop={true}
            modules={[A11y, Navigation]}
            slidesPerView={1}
            navigation={{
              nextEl: `.pc__img-next_${new Date().getTime().toString()}`,
              prevEl: `.pc__img-prev_${new Date().getTime().toString()}`,
            }}
            spaceBetween={50}
          >
            {product.images.map((url, index) => {
              return (
                <SwiperSlide key={index} style={{ width: 255 }}>
                  <button
                    onClick={() =>
                      navigate.push(`/shop/product-details/${product.id}`)
                    }
                  >
                    <img
                      loading="lazy"
                      src={url}
                      width={330}
                      height={400}
                      alt="Cropped Faux leather Jacket"
                      className="pc__img"
                    />
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <span
            className={`pc__img-prev_${new Date().getTime().toString()}`}
            style={{ fontSize: 26 }}
            role="button"
            aria-controls={new Date().getTime().toString()}
          >
            <GrPrevious fontSize={25} />
          </span>
          <span
            className={`pc__img-next_${new Date().getTime().toString()}`}
            role="button"
            aria-controls={new Date().getTime().toString()}
          >
            <GrNext />
          </span>
          <button
            className="btn-remove-from-wishlist"
            onClick={() => dispatch(removeFromWishlist(product.id))}
          >
            <HiOutlineXMark />
          </button>
        </div>
        <div className="pc__info position-relative">
          <p className="pc__category">{product.type}</p>
          <h6 className="pc__title">{product.name}</h6>
          <div className="product-card__price d-flex">
            <span className="money price">${product.price}</span>
          </div>
          <button
            className="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist"
            title="Add To Wishlist"
            disabled
          >
            <FaHeart fontSize={20} style={{ color: 'red' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
