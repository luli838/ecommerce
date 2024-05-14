export const getAllProducts = async () => {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  if (!res.ok) throw new Error("Response not ok");
  const data = await res.json();

  // Modificar los datos de productos para incluir la URL de la primera imagen
  const productsWithFirstImage = data.slice(0, 21).map((product) => ({
    ...product,
    image: product.images[0], // Asignar la primera imagen como 'image'
  }));

  return productsWithFirstImage;
};

export const getCartFromStorage = () => {
  const storedCart = window.localStorage.getItem("cart");
  const cart = JSON.parse(storedCart);
  return cart ? cart : [];
};