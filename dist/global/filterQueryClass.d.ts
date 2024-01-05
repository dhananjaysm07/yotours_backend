import { TourFilterInput } from "src/tour/dto/filter-tour-input";
import { Repository, SelectQueryBuilder } from "typeorm";
export declare abstract class GenericService<T> {
    private readonly repository;
    constructor(repository: Repository<T>);
    getAllFiltered(filter: TourFilterInput, page?: number, loadCount?: number): Promise<{
        data: T[];
        count: number;
    }>;
    protected abstract applyFilters(queryBuilder: SelectQueryBuilder<T>, filter: TourFilterInput): void;
}
