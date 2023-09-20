import { CartSummary } from "../Components/Page/Cart";

const ShoppingCart = () => {
  return (
    <div className="row w-100" style={{ marginTop: "10px" }}>
      <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
        <CartSummary />
      </div>
      <div className="col-lg-6 col-12 p-4" style={{ fontWeight: 300 }}>
        {/* <CartPickUpDetails /> */}
        Details
      </div>
    </div>
  );
};

// export default withAuth(ShoppingCart);
export default ShoppingCart;