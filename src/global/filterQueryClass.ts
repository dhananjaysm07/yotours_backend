import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { Repository, SelectQueryBuilder } from "typeorm";
type filterType = {
  location: string;
  priceMin: number;
  priceMax: number;
  startDate: string;
  endDate: string;
};
export abstract class GenericService<T> {
  constructor(private readonly repository: Repository<T>) {
    console.log("function called");
  }

  async getAllFiltered(
    filter: TourFilterInput,
    page: number = 1,
    loadCount: number = 50
  ): Promise<{ data: T[]; count: number }> {
    const take = loadCount;
    const skip = (page - 1) * take;
    // console.log("function called1111111", filter, page);
    const queryBuilder = this.repository.createQueryBuilder("entity");

    // Extend this method to apply specific joins or conditions for each entity
    this.applyFilters(queryBuilder, filter);

    // Apply common conditions
    // queryBuilder.andWhere("entity.active = :active", { active: true });
    const count = await queryBuilder.getCount();
    // Apply pagination
    queryBuilder.skip(skip).take(take);
    const data = await queryBuilder.getMany();
    // console.log("dataaa----------------------------", data);
    return { data, count };
  }

  // Extend this method in each concrete service class to apply entity-specific filters
  protected abstract applyFilters(
    queryBuilder: SelectQueryBuilder<T>,
    filter: TourFilterInput
  ): void;
}
