import { Controller, Get, Post, Patch, Param, Body, UseGuards, ParseIntPipe, Request, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';
import Stripe from 'stripe';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('STRIPE_SERVICE') private readonly stripeService: Stripe,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar um novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.id, createOrderDto);
  }

  @Post('checkout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Criar sessão de checkout' })
  @ApiResponse({ status: 201, description: 'Sessão de checkout criada com sucesso' })
  async createCheckoutSession(@Request() req, @Body() { items }: { items: { productId: number; quantity: number }[] }) {
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const product = await this.ordersService['prisma'].product.findUnique({ where: { id: item.productId } });
        if (!product) {
          throw new Error(`Produto com ID ${item.productId} não encontrado`);
        }
        return {
          price_data: {
            currency: 'usd',
            product_data: { name: product.name },
            unit_amount: Math.round(product.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        };
      }),
    );
    const session = await this.stripeService.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    return { id: session.id };
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar pedidos do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos retornada' })
  async findAllByUser(@Request() req) {
    return this.ordersService.findAllByUser(req.user.id);
  }

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiOperation({ summary: 'Listar todos os pedidos (apenas admin)' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos retornada' })
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Obter um pedido por ID' })
  @ApiResponse({ status: 200, description: 'Pedido retornado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const isAdmin = await this.isAdmin(req.user.id);
    return this.ordersService.findOne(id, req.user.id, isAdmin);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiOperation({ summary: 'Atualizar o status de um pedido (apenas admin)' })
  @ApiResponse({ status: 200, description: 'Pedido atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  private async isAdmin(userId: number): Promise<boolean> {
    const user = await this.ordersService['prisma'].user.findUnique({
      where: { id: userId },
    });
    return user?.role === 'ADMIN';
  }
}