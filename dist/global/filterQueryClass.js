"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericService = void 0;
class GenericService {
    constructor(repository) {
        this.repository = repository;
        console.log("function called");
    }
    async getAllFiltered(filter, page = 1, loadCount = 50) {
        const take = loadCount;
        const skip = (page - 1) * take;
        const queryBuilder = this.repository.createQueryBuilder("entity");
        this.applyFilters(queryBuilder, filter);
        queryBuilder.orderBy("entity.priority", "DESC");
        const count = await queryBuilder.getCount();
        queryBuilder.skip(skip).take(take);
        const data = await queryBuilder.getMany();
        return { data, count };
    }
}
exports.GenericService = GenericService;
//# sourceMappingURL=filterQueryClass.js.map