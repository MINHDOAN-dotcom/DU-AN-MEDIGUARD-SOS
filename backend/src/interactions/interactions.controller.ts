import { Controller, Post, Body } from "@nestjs/common";
import { InteractionsService } from "./interactions.service";

@Controller("interactions")
export class InteractionsController {
  constructor(private service: InteractionsService) {}

  @Post("analyze")
  analyze(@Body() body: { medicines: any[] }) {
    return this.service.analyze(body.medicines || []);
  }

  @Post("check")
  check(@Body() body: { ingredients: string[] }) {
    return this.service.checkIngredients(body.ingredients || []);
  }
}