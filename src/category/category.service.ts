import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private categories: Array<{ id: number; name: string }> = [
    { id: 1, name: 'Books' },
    { id: 2, name: 'Electronics' },
  ];

  create(createCategoryDto: CreateCategoryDto) {
    const id = this.categories.length + 1;
    const category = { id, name: createCategoryDto['name'] ?? 'Unnamed' };
    this.categories.push(category);
    return category;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find((c) => c.id === Number(id)) ?? null;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const idx = this.categories.findIndex((c) => c.id === Number(id));
    if (idx === -1) return null;
    this.categories[idx] = { ...this.categories[idx], ...(updateCategoryDto as any) };
    return this.categories[idx];
  }

  remove(id: number) {
    const idx = this.categories.findIndex((c) => c.id === Number(id));
    if (idx === -1) return null;
    const [removed] = this.categories.splice(idx, 1);
    return removed;
  }
}
