export const getAllProducts = async () => {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  if (!res.ok) throw new Error("Response not ok");
  const data = await res.json();
  //return data.slice(0, 21);
  // Modificar los datos de productos para incluir la URL de la primera imagen
  const productsWithFirstImage = data.slice(0, 21).map((product) => ({
    ...product,
    image: product.images[0], // Asignar la primera imagen como 'image'
  }));

  return productsWithFirstImage;
};


/*
*/ 