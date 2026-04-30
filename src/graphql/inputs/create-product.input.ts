import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  name!: string;

  @Field(() => Float)
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @Field(() => ID)
  @Type(() => Number)
  @IsInt()
  categoryId!: number;
}