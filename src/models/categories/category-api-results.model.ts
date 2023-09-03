import type CategoryDto from "./category.model";

export class CategoryApiResults {
  status!: string;
  categories?: CategoryDto[];
  category?: CategoryDto;
}
