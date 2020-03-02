import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') productTitle: string,
    @Body('description') description: string,
    @Body('price') price: number
    ) {
    const generatedId = this.productsService.inserProduct(productTitle, description, price);
    return { id: generatedId };
  }

  // Get all products
  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  // Get a single product
  @Get(':id')
  getSingleProduct(@Param('id') id: string) {
    return this.productsService.getSingleProduct(id)
  }

  // Update a product
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') productTitle: string,
    @Body('description') description: string,
    @Body('price') price: number
  ){
    return this.productsService.updateProduct(id, productTitle, description, price);
  }

  // Delete a product
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    const productDeleted = this.productsService.deleteProduct(id);
    return productDeleted;
  }
}