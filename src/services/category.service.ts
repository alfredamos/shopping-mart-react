import Axios from "../interceptors/axios.interceptor";
import { BehaviorSubject } from "rxjs";
import CategoryDto from "../models/categories/category.model";
//import { AuthApiResponse } from "../models/auth/api-response.model";

export class CategoryService {
  private categoriesSubject = new BehaviorSubject<CategoryDto[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(public url: string) {
    const categories = this.getCategoriesFromLocalStorage();
    if (categories && categories.length > 0) this.onLoad();
  }

  async createCategory(categoryDto: CategoryDto) {
    const {data} = await Axios.post<CategoryDto>(`${this.url}`, categoryDto);

    return data;
  }

  onLoad() {
    console.log("In onload!!!");
    this.getAllCategories()
      .then((data) => {
        this.updateCategories$(data);
        console.log({ categories: data });
        localStorage.setItem("categories", JSON.stringify(data));
      })
      .catch((error) => console.log(error));
  }

  async editCategory(categoryDto: CategoryDto) {
    const {data} = await Axios.patch<CategoryDto>(
      `${this.url}/${categoryDto.id}`,
      categoryDto
    );

    return data;
  }

  async deleteCategory(id: string) {
    const {data} = await Axios.delete<CategoryDto>(`${this.url}/${id}`);
  
    return data;
  }

  async getAllCategories() {
    const { data } = await Axios.get<CategoryDto[]>(this.url);
    console.log("In service", {data});
    
    return data;
  }

  async getCategoryById(id: string) {
    const { data } = await Axios.get<CategoryDto>(`${this.url}/${id}`);
    return data;
  }

  private getCategoriesFromLocalStorage(): CategoryDto[] {
    const categories = JSON.parse(localStorage.getItem("categories")!);
    return categories;
  }

  updateCategories$(value: CategoryDto[]) {
    this.categoriesSubject.next(value);
  }

  updateWithOneCategory$(value: CategoryDto) {
    const allCategories = this.getCategories();
    const newAllCategories = [...allCategories, value];
    this.categoriesSubject.next(newAllCategories);
  }

  getCategories(): CategoryDto[] {
    return this.categoriesSubject.getValue();
  }
}

const categoryUrl = "/categories";

export const categoryService = new CategoryService(categoryUrl);
