import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TagService } from "./tag.service";
import { Tag } from "./entities/tag.entity";
import { StatusResult } from "src/common/entities/status-result.entity";
import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  createTag(@Args("createTagDto") createTagDto: CreateTagDTO) {
    return this.tagService.createTag(createTagDto);
  }
  @Mutation(() => Tag)
  updateTag(
    @Args("updateTagDto") updateTagDto: UpdateTagDTO) {
    return this.tagService.updateTag(updateTagDto);
  }

  @Query(() => [Tag])
  getAllTags() {
    return this.tagService.findAllTags();
  }

  @Query(() => Tag)
  getTagById(@Args("id", { type: () => String }) id: string) {
    return this.tagService.findOneTag(id);
  }

  @Mutation(() => StatusResult)
  removeTag(@Args("tagId", { type: () => String }) id: string) {
    return this.tagService.removeTag(id);
  }

 
  @Mutation(() => Tag)
  async activateTag(@Args("tagId") tagId: string): Promise<Tag> {
    return this.tagService.activateTag(tagId);
  }

  @Mutation(() => Tag)
  async deactivateTag(@Args("tagId") tagId: string): Promise<Tag> {
    return this.tagService.deactivateTag(tagId);
  }
}
