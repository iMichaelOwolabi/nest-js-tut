import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  inserProduct(title: string, description: string, price: number) {
    const productId = Math.random().toString();
    const product = new Product(productId, title, description, price);
    this.products.push(product);

    return productId;
  } 

  //Get all products
  getProducts() {
    return [...this.products]
  }

  // get a single product
  getSingleProduct(id: string) {
    const product = this.findProduct(id)[0];
    return {...product}
  }

  // Update a single product
  updateProduct(id: string, title: string, description: string, price: number) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = {...product}
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;
    this.products[index] = updatedProduct;
    return 'updated';
  }

  deleteProduct(id: string) {
    const productIndex = this.findProduct(id)[1];
    this.products.splice(productIndex, 1);
    return 'product successfully deleted';
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(product => product.id === id);
    const product = this.products[productIndex]
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return [product, productIndex];
  }
}
