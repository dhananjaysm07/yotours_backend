import { Resolver, Args, Mutation, Query } from "@nestjs/graphql";
import { ContentService } from "./content.service";
import { CreateContentInput } from "./dto/create-content.input";
import { Content } from "./entities/content.entity";
import { UpdateContentInput } from "./dto/update-content.input";

@Resolver(() => Content)
export class ContentResolver {
  constructor(private contentService: ContentService) {}

  @Query(() => Content, { name: "getContent" })
  async getContent(): Promise<Content> {
    return this.contentService.findOne();
  }

  @Mutation(() => Content)
  async createContent(
    @Args("createContentInput") createContentInput: CreateContentInput
  ): Promise<Content> {
    return this.contentService.create(createContentInput);
  }

  @Mutation(() => Content)
  async updateContent(
    @Args("updateContentInput") updateContentInput: UpdateContentInput
  ): Promise<Content> {
    return this.contentService.updateContent(updateContentInput);
  }
}
