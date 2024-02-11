import {createContext, ReactNode, useContext, useState} from "react";
import {ShoppingCart} from "../components/ShoppingCart";

type PShoppingCartProvider = {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number
}

type CShoppingCart = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartItemQuantity: (id: number) => void
    decreaseCartItemQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as CShoppingCart);

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({children}: PShoppingCartProvider) {
    const [cartItems, SetCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false);

    const cartQuantity = cartItems.reduce((quantity, item) =>
        item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);


    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartItemQuantity(id: number) {
        SetCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1};
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseCartItemQuantity(id: number) {
        SetCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1};
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function removeFromCart(id: number) {
        SetCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        });
    }


    return <ShoppingCartContext.Provider value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        removeFromCart,
        cartItems,
        cartQuantity
    }}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}