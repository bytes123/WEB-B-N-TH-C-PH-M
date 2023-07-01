import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "test",
  currency: "USD",
  intent: "capture",
};

export default function Paypal({ billInfor, handleCheckout }) {
  return (
    <PayPalScriptProvider options={{ "client-id": "test" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: (billInfor.bill_price / 22000).toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            billInfor.bill_payed = 1;
            handleCheckout(billInfor);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
