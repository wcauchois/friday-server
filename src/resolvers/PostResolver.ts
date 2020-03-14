import { Query, Resolver, InputType, Field, Mutation, Arg } from "type-graphql";
import Post from "../entity/Post";

@InputType()
class PostInput implements Partial<Post> {
  @Field()
  body!: string;
}

@Resolver(Post)
export default class PostResolver {
  @Query(() => [Post])
  async allPosts() {
    return Post.find();
  }

  @Mutation(() => Post)
  async addPost(@Arg("input") input: PostInput): Promise<Post> {
    const post = new Post();
    post.body = input.body;
    return post.save();
  }
}
