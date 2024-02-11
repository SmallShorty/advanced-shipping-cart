import {Offcanvas, Stack} from "react-bootstrap";
import {useShoppingCart} from "../context/ShoppingCartContext";
import {CartItem} from "./CartItem";
import storeItems from "../data/items.json";
import {formatCurrency} from "../utilities/formatCurrency";

type PShoppingCart = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}: PShoppingCart) {
    const {closeCart, cartItems} = useShoppingCart()
    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item}/>
                ))
                }
            </Stack>
            <div className="ms-auto fw-bold fs-3">
                Total{" "}
                {formatCurrency(
                    cartItems.reduce((total, cartItems) => {
                        const item = storeItems.find(i => i.id === cartItems.id)
                        return total + (item?.price || 0) * cartItems.quantity
                    }, 0)
                )}
            </div>
        </Offcanvas.Body>
    </Offcanvas>
}