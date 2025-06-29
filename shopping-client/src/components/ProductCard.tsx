import { Product } from '../features/products/types';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../features/cart/cartSlice';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>מחיר: {product.price} ₪</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
      >
        הוסף לסל
      </button>
    </div>
  );
};

export default ProductCard;
