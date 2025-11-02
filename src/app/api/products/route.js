export async function GET() {
  const products = [
    { id: 'p1', name: 'Laptop', price: 1200, category: 'Electronics', stock: 5 },
    { id: 'p2', name: 'Desk Chair', price: 150, category: 'Furniture', stock: 3 },
    { id: 'p3', name: 'Phone', price: 900, category: 'Electronics', stock: 4 },
    { id: 'p4', name: 'Desk Chair', price: 145, category: 'Furniture', stock: 7 },
    { id: 'p5', name: 'Running Shoes', price: 75, category: 'Apparel', stock: 2 },
    { id: 'p6', name: 'Hoodie', price: 30, category: 'Apparel', stock: 9 },
    { id: 'p7', name: 'Headphones', price: 85, category: 'Electronics', stock: 5 },
    { id: 'p8', name: 'Coffee Table', price: 97, category: 'Furniture', stock: 8 }
  ];
  return Response.json(products);
}