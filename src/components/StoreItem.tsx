import {Button, Card} from "react-bootstrap";
import {formatCurrency} from "../utilities/formatCurrency";
import {useShoppingCart} from "../context/ShoppingCartContext";

type TStoreItem = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export function StoreItem({id, name, price, imgUrl}: TStoreItem) {
    const {
        getItemQuantity,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        removeFromCart
    } = useShoppingCart();
    const quantity = getItemQuantity(id);
    return <Card className="h-100">
        <Card.Img variant="top" src={imgUrl} alt={name} height="200px"
                  style={{objectFit: "cover"}}></Card.Img>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="">{name}</span>
                <span className="ms-2 text-muted">{formatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto d-flex justify-content-between align-content-center">
                <Button className="w-50" onClick={() => increaseCartItemQuantity(id)}>Add to Cart</Button>
                {quantity !== 0 ? (
                    <div className="d-flex align-items-baseline" style={{gap: ".5rem"}}>
                        <Button onClick={() => removeFromCart(id)}>Clear</Button>
                        <Button onClick={() => decreaseCartItemQuantity(id)}>-</Button>
                        <div className="">{quantity}</div>
                        <Button onClick={() => increaseCartItemQuantity(id)}>+</Button>
                    </div>
                ) : null}
            </div>
        </Card.Body>
    </Card>
}